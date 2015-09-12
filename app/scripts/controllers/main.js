'use strict';

/**
 * @ngdoc function
 * @name berkleeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the berkleeApp
 */
angular.module('berkleeApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
