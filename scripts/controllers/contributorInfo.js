'use strict';

angular.module('githubRepoViewerApp')
  .controller('ContributorInfoCtr', function ($scope, $rootScope, $location, $routeParams, GitHubService) {
    $scope.contributor = $routeParams.contributor;
    $scope.repositories;

    var setRepositories = function(url) {
        GitHubService.getGithubData(url).then (function(data) {
          $scope.repositories = data;
        })
    }


     if (!$rootScope.contributorInfo) {
        GitHubService.getUserInfo($scope.contributor).then (function(data) {
          $rootScope.contributorInfo = data;
          setRepositories($rootScope.contributorInfo.repos_url);
        })
     }
     else {
        setRepositories($rootScope.contributorInfo.repos_url);
     }




   /*GitHubService.getGithubData($rootScope.contributorInfo.repos_url).then(function(data){
      $scope.repositories = data;
   }, function(reason){
    console.log("no repositories");
   }); */


   $scope.showRepoInfo = function(repository) {
    $location.url('/owner/' + $scope.contributor + '/repo/' + repository);

   }

  });



