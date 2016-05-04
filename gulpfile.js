var gulp = require('gulp'),
    browserify = require("browserify"),
    source = require('vinyl-source-stream'),
    babelify = require("babelify"),
    webserver = require('gulp-webserver'),
    htmlmin = require('gulp-htmlmin'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    uuid = require('node-uuid'),
    rename = require("gulp-rename"),
    concat = require("gulp-concat"),
    ngHtml2Js = require("gulp-ng-html2js"),
    inject = require('gulp-inject'),
    es = require('event-stream'),
    del = require('del'),
    Q = require('q'),
    streamify = require('gulp-streamify'),
    globbing = require('gulp-css-globbing'),
    ngAnnotate = require('gulp-ng-annotate'),
    Server = require('karma').Server,
    sh = require('shelljs'),
    gutil = require('gulp-util'),
    envify = require('envify'),
    protractor = require('gulp-protractor').protractor,
    standard = require('gulp-standard'),
    sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var webkitAssign = require('webkit-assign/gulp');
var run = require('gulp-run');

var source_paths = {
  sass: './source/sass/app.scss',
  js: './source/app.js',
  all_sass: './source/**/*.scss',
  all_js: './source/**/*.js',
  all_html: './source/**/*.html',
  html_index: './source/index.html',
  partials: './source/components/**/*.html',
  partials_dest: './source/partials',
  dev_css: './www/css',
  dev_js: './www/js',
  dev_html: './www/',
  prod_css: './www/css',
  prod_js: './www/js',
  prod_html: './www',
}

tasks = {
  baseBrowserify: function() {
   return browserify([source_paths.js], {
          transform: [
            'envify',
            ['babelify', { compact: false , plugins: ["object-assign"]}]
          ]
      })
      .bundle()
      .on('error', function(e) { console.log(e.message) })
      .pipe(source('app.js'))
  },
  prodBrowserify: function() {
    return this.baseBrowserify()
      .pipe(ngAnnotate())
      // .pipe(streamify(uglify()))
      // .pipe(rename(tasks.assetProdName('js')))
      .pipe(gulp.dest(source_paths.prod_js))
  },
  devBrowserify: function() {
    return tasks.baseBrowserify()
      .pipe(gulp.dest(source_paths.dev_js));
  },
  prodCss: function() {
    return gulp.src(source_paths.sass)
      .pipe(globbing({extensions: ['.scss']}))
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(autoprefixer({ browsers: ['> 1%','iOS 7'], flexbox: true }))
      .pipe(minifyCss({compatibility: 'ie8'}))
      // .pipe(rename(tasks.assetProdName('css')))
      .pipe(gulp.dest(source_paths.prod_css));
  },
  devCss: function() {
    return gulp.src(source_paths.sass)
      .pipe(globbing({extensions: ['.scss']}))
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(autoprefixer({ browsers: ['> 1%','iOS 7'], flexbox: true }))
      .pipe(gulp.dest(source_paths.dev_css));
  },
  injectHtml: function(dest, injected_files) {
    return gulp.src(source_paths.html_index)
      .pipe(inject(injected_files,
                  {
                    ignorePath: ['dist', 'build', 'source', 'www'],
                    addRootSlash: false,
                    removeTags: true,
                  }))
      .pipe(gulp.dest(dest))
  },
  BaseNgHtml: function(dest) {
    return gulp.src(source_paths.partials)
      .pipe(htmlmin({
        empty: true,
        spare: true,
        quotes: true
      }))
      .pipe(ngHtml2Js({
        moduleName: "App.partialsPrecompile"
      }))
      .pipe(concat("index.js"))
      .pipe(gulp.dest(dest))
  },
  assetProdName: function(type) {
    var name = "app-" + uuid.v1() + "." + type;
    return name
  },
  copyIonicBundle: function () {
    return gulp.src([
      'vendors/ionic/js/**/*.js',
    ])
    .pipe(gulp.dest('www/lib/ionic/js/'))
  },
  copyIonicIOBundle: function () {
    return gulp.src([
      'vendors/ionic-platform-web-client/dist/*.js',
    ])
    .pipe(gulp.dest('www/lib/ionic-platform-web-client/dist/'))
  },
  lint: function() {
    return gulp.src("./source/*/**/*.js")
    .pipe(standard({
      ignore: [
        "**/partials/**/*.js"
      ],
      globals: [ "angular", "cordova", "Camera", "StatusBar" ]
    }))
    .pipe(standard.reporter('default', {
      breakOnError: false
    }))
  }
}

gulp.task('lint', tasks.lint);

gulp.task('clean', function() {
  var deferred = Q.defer();
  del(source_paths.prod_html, function() {
    deferred.resolve();
  });
  return deferred.promise;
});

gulp.task('sass', tasks.devCss)

gulp.task('browserify', tasks.devBrowserify)

gulp.task('ngHtml', function() {
  return tasks.BaseNgHtml(source_paths.partials_dest)
})

gulp.task('copyFonts', function() {
  return gulp.src('./source/fonts/**/*')
  .pipe(gulp.dest('./www/fonts/'))
})

gulp.task('copyImages', function() {
  return gulp.src('./source/images/**/*')
  .pipe(gulp.dest('./www/images/'))
})

gulp.task('copyIonic', function() {
  return es.merge(tasks.copyIonicBundle(),tasks.copyIonicIOBundle())
})

gulp.task('cleanIonic', function() {
  var deferred = Q.defer();
  del(['./www/ionic.bundle.min.js', './www/ionic.io.bundle.min.js'], function() {
    deferred.resolve();
  });
  return deferred.promise;
});

gulp.task('ionicBundleWebkitAssign', function() {
  return gulp.src('./source/ionic.bundle.min.js')
      .pipe(webkitAssign())
      .pipe(gulp.dest('./www/'));
})

gulp.task('ionicIOWebkitAssign', function() {
  return gulp.src('./source/ionic.io.bundle.min.js')
      .pipe(webkitAssign())
      .pipe(gulp.dest('./www/'));
})

gulp.task('ionicWebkitAssign', ['cleanIonic', 'ionicBundleWebkitAssign', 'ionicIOWebkitAssign'])

gulp.task('inject', ['ngHtml', 'copyFonts', 'copyIonic', 'copyImages'], function() {
  return tasks.injectHtml(
    source_paths.dev_html,
    es.merge(tasks.devCss(), tasks.devBrowserify())
  )
})

gulp.task('injectProduction', ['ngHtml', 'copyFonts', 'copyIonic', 'copyImages']);

gulp.task('compile', function() {
  return tasks.injectHtml(
    source_paths.prod_html,
    es.merge(tasks.prodCss(), tasks.prodBrowserify())
  )
})

gulp.task('build', ['inject'], function () {
  return run('npm run config_ionic_dev').exec()
})

gulp.task('dist', ['injectProduction', 'compile'], function () {
  return run('npm run config_ionic_prod').exec()
});

gulp.task('build:watch', ['build'], function() {
  gulp.watch(source_paths.all_sass, ['sass'])
  gulp.watch(source_paths.all_js, ['browserify'])
  gulp.watch(source_paths.all_html, ['inject'])
});

gulp.task('serve', ['build:watch'],function() {
  return gulp.src('www')
  .pipe(webserver({
    host: '192.168.1.178',
    open: true,
    livereload: true
  }));
});

gulp.task('serve:dist',function() {
  return gulp.src('www')
    .pipe(webserver({
      open: true,
      livereload: true
    }));
});

/**
*  * Run test once and exit
*   */
gulp.task('test',function (done) {
  return new Server({
    configFile: __dirname + '/test/karma.conf.js',
    singleRun: true
  }, done).start();
});

/**
*  * Watch for file changes and re-run tests on each change
*   */
gulp.task('tdd', function (done) {
  return new Server({
    configFile: __dirname + '/test/karma.conf.js'
  }, done).start();
});

gulp.task('e2e', ['build'], function() {
  return gulp.src(["./test/e2e/*.js"])
    .pipe(protractor({
        configFile: "test/protractor.conf.js",
        args: ['--baseUrl', 'http://127.0.0.1:8000']
    }))
    .on('error', function(e) { throw e })
});

gulp.task('default', ['build']);

// Ionic Tasks

gulp.task('install', ['git-check'], function() {
  return gutil.log('bower', gutil.colors.cyan("bower is not installed use browserify instead"));
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
