(function(module) {
try {
  module = angular.module('App.partialsPrecompile');
} catch (e) {
  module = angular.module('App.partialsPrecompile', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('home/home.html',
    '<ion-view view-title="Bienvenida">\n' +
    '<ion-content class="flex-container vertical-center horizontal-center">\n' +
    '  <h1 class="Appname-center"> {{ home.Appname }} </h1>\n' +
    '</ion-content>\n' +
    '</ion-view>');
}]);
})();
