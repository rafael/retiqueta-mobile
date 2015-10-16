(function(module) {
try {
  module = angular.module('App.partialsPrecompile');
} catch (e) {
  module = angular.module('App.partialsPrecompile', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('auth/login.html',
    '<ion-view view-title="{{ \'DO_LOGIN\' | translate }}">\n' +
    '  <ion-content padding="true">\n' +
    '    <h1> {{ \'DO_LOGIN\' | translate }} </h1>\n' +
    '  </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('App.partialsPrecompile');
} catch (e) {
  module = angular.module('App.partialsPrecompile', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('auth/signup.html',
    '<ion-view view-title="{{ \'DO_SIGNUP\' | translate }}">\n' +
    '  <ion-content padding="true">\n' +
    '    <h1> {{ \'DO_SIGNUP\' | translate }} </h1>\n' +
    '  </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('App.partialsPrecompile');
} catch (e) {
  module = angular.module('App.partialsPrecompile', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('home/home.html',
    '<ion-view view-title="Bienvenida">\n' +
    '  <ion-content padding="true">\n' +
    '    <h1 class="Appname-center"> {{ home.Appname }} </h1>\n' +
    '    <a ui-sref="login" class="button button-block button-positive">\n' +
    '      {{ \'DO_LOGIN\' | translate }}\n' +
    '    </a>\n' +
    '    <a ui-sref="signup" class="button button-block button-positive">\n' +
    '      {{ \'DO_SIGNUP\' | translate }}\n' +
    '    </a>\n' +
    '  </ion-content>\n' +
    '</ion-view>');
}]);
})();
