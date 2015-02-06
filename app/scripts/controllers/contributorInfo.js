'use strict';

angular.module('githubRepoViewerApp')
  .controller('ContributorInfoCtr', function ($scope, $rootScope, $location, $routeParams, GitHubService) {
    $scope.contributor = $routeParams.contributor;
    $scope.joined;
    $scope.repositories;

    var setRepositories = function(url) {
        GitHubService.getGithubData(url).then (function(data) {
          $scope.repositories = data;
        })
    }


     if (!$rootScope.contributorInfo) {
        GitHubService.getUserInfo($scope.contributor).then (function(data) {
          $rootScope.contributorInfo = data;
          $scope.joined = GitHubService.formatDate($rootScope.contributorInfo.created_at);
          setRepositories($rootScope.contributorInfo.repos_url);
        })
     }
     else {
      $scope.joined = GitHubService.formatDate($rootScope.contributorInfo.created_at);
        setRepositories($rootScope.contributorInfo.repos_url);
     }

   $scope.showRepoInfo = function(repository) {
    $location.url('/owner/' + $scope.contributor + '/repo/' + repository);

   }

  });



