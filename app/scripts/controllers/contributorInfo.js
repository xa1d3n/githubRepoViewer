'use strict';

angular.module('githubRepoViewerApp')
  .controller('ContributorInfoCtr', function ($scope, $rootScope, $location, $routeParams, GitHubService) {
    $scope.contributor = $routeParams.contributor;
    $scope.repositories;

   GitHubService.getUserRepositories($rootScope.contributorInfo.repos_url).then(function(data){
      $scope.repositories = data;
   }, function(reason){
    console.log("no repositories");
   });

   $scope.showRepoInfo = function(repository) {
    $location.url('/owner/' + $scope.contributor + '/repo/' + repository);

   }

  });



