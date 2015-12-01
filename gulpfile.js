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
    protractor = require("gulp-protractor").protractor,
    sass = require('gulp-sass');

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
            ['babelify', { compact: false }]
          ]
      })
      .bundle()
      .on('error', function(e) { console.log(e.message) })
      .pipe(source('app.js'))
  },
  prodBrowserify: function() {
    return this.baseBrowserify()
      .pipe(ngAnnotate())
      .pipe(streamify(uglify()))
      .pipe(rename(tasks.assetProdName('js')))
      .pipe(gulp.dest(source_paths.prod_js))
  },
  devBrowserify: function() {
    return this.baseBrowserify()
      .pipe(gulp.dest(source_paths.dev_js));
  },
  prodCss: function() {
    return gulp.src(source_paths.sass)
      .pipe(globbing({extensions: ['.scss']}))
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(minifyCss({compatibility: 'ie8'}))
      .pipe(rename(tasks.assetProdName('css')))
      .pipe(gulp.dest(source_paths.prod_css));
  },
  devCss: function() {
    return gulp.src(source_paths.sass)
      .pipe(globbing({extensions: ['.scss']}))
      .pipe(sass.sync().on('error', sass.logError))
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
}

gulp.task('clean', function() {
  var deferred = Q.defer();
  del(source_paths.prod_html, function() {
    deferred.resolve();
  });
  return deferred.promise;
});

gulp.task('sass', function() { tasks.devCss() })

gulp.task('browserify', function() { tasks.devBrowserify()})

gulp.task('ngHtml', function() {
  tasks.BaseNgHtml(source_paths.partials_dest)
})

gulp.task('copyFonts', function() {
  gulp.src('./source/fonts/**/*')
  .pipe(gulp.dest('./www/fonts/'))
})

gulp.task('copyIonic', function() {
  gulp.src([
    './source/ionic.bundle.min.js',
    './source/ionic.io.bundle.min.js'
  ])
  .pipe(gulp.dest('./www/'))
})

gulp.task('inject', ['ngHtml', 'copyFonts', 'copyIonic'], function() {
  tasks.injectHtml(
    source_paths.dev_html,
    es.merge(tasks.devCss(), tasks.devBrowserify())
  )
})

gulp.task('inject:prod',['ngHtml', 'copyFonts', 'copyIonic'], function() {
  tasks.injectHtml(
    source_paths.prod_html,
    es.merge(tasks.prodCss(), tasks.prodBrowserify())
  )
});

gulp.task('build', ['inject'])

gulp.task('build:watch', ['build'], function() {
  gulp.watch(source_paths.all_sass, ['sass'])
  gulp.watch(source_paths.all_js, ['browserify'])
  gulp.watch(source_paths.all_html, ['inject'])
});

gulp.task('dist', ['clean','inject:prod']);

gulp.task('serve', ['build:watch'],function() {
  gulp.src('www')
    .pipe(webserver({open: true, livereload: true}));
});

gulp.task('serve:dist',function() {
  gulp.src('www')
    .pipe(webserver({open: true}));
});

/**
*  * Run test once and exit
*   */
gulp.task('test',function (done) {
  new Server({
    configFile: __dirname + '/test/karma.conf.js',
    singleRun: true
  }, done).start();
});

/**
*  * Watch for file changes and re-run tests on each change
*   */
gulp.task('tdd', ['build:watch'], function (done) {
  new Server({
    configFile: __dirname + '/test/karma.conf.js'
  }, done).start();
});

gulp.task('e2e', ['build'], function() {
  gulp.src(["./test/e2e/*.js"])
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
