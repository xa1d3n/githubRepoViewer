'use strict';

angular
  .module('githubRepoViewerApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/owner/:owner/repo/:name', {
        templateUrl: 'views/repoInfo.html',
        controller: 'RepoInfoCtrl'
      })
      .when('/contributor/:contributor', {
        templateUrl: 'views/contributorInfo.html',
        controller: 'ContributorInfoCtr'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
