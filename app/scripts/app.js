'use strict';

/**
 * @ngdoc overview
 * @name berkleeApp
 * @description
 * # berkleeApp
 *
 * Main module of the application.
 */
angular
  .module('berkleeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'datamaps',
    'checklist-model'
  ])
  .constant('_', window._)
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
