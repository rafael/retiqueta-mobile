'use strict';

describe('Controller: homeCtrl', function () {

  // load the controller's module
  beforeEach(module('App'));

  var homeCtrl, scope, $ENV;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, ENV) {
    scope = $rootScope.$new();
    $ENV = ENV
    homeCtrl = $controller('homeCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a helloMessage to the scope', function () {
    expect(homeCtrl.Appname).toBe($ENV.app_name);
  });
});
