'use strict';

/**
 * @ngdoc function
 * @name berkleeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the berkleeApp
 */
angular.module('berkleeApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
