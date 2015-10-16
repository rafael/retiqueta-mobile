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
    '    <form form-for="login.user" form-for-builder validation-rules="login.validationRules" submit-with="login.submit(login.user)">\n' +
    '      <submit-button disable="sendingInfo" label="{{ \'SUBMIT\' | translate }}"></submit-button>\n' +
    '    </form>\n' +
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
    '    <form form-for="signup.user" form-for-builder validation-rules="signup.validationRules" submit-with="signup.submit(signup.user)">\n' +
    '      <submit-button disable="sendingInfo" label="{{ \'SUBMIT\' | translate }}"></submit-button>\n' +
    '    </form>\n' +
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

(function(module) {
try {
  module = angular.module('App.partialsPrecompile');
} catch (e) {
  module = angular.module('App.partialsPrecompile', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('user/dashboard.html',
    '<ion-view view-title="{{ \'DASHBOARD_TITLE\' | translate }}">\n' +
    '  <ion-content padding="true">\n' +
    '    <h1> {{ \'DASHBOARD_TITLE\' | translate }} </h1>\n' +
    '    <p>{{ dash.current_user.attributes.name }}</p>\n' +
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
  $templateCache.put('user/index.html',
    '<ion-tabs class="tabs-icon-top tabs-positive">\n' +
    '\n' +
    '  <ion-tab title="Home" icon="ion-home" ui-sref="users.dashboard">\n' +
    '    <ion-nav-view name="dashboard-tab"></ion-nav-view>\n' +
    '  </ion-tab>\n' +
    '\n' +
    '</ion-tabs>');
}]);
})();
