'use strict';

angular.module('githubRepoViewerApp')
  .controller('RepoInfoCtrl', function ($scope, $rootScope, $routeParams, $location, GitHubService) {
    $scope.owner = $routeParams.owner;
    $scope.repo = $routeParams.name;
    $scope.createdAt;
    $scope.lastUpdate;
    $scope.errors = [];
    $scope.contributors;
    $rootScope.contributorInfo;

    var setContributors = function(url) {
      GitHubService.getGithubData(url).then (function(data) {
        $scope.contributors = data;
      }, function(reason) {
        $scope.errors.push("Failed to retreive contributors");
      });
    }

    if (!$rootScope.repoInfo) {
      var repoInfo = $scope.owner + '/' + $scope.repo;

      GitHubService.getRepository(repoInfo).then (function(data) {
        $rootScope.repoInfo = data;
        $scope.createdAt = GitHubService.formatDate($rootScope.repoInfo.created_at);
        $scope.lastUpdate = GitHubService.formatDate($rootScope.repoInfo.updated_at);
        setContributors(data.contributors_url);
      }, function(reason) {
        $scope.errors.push("Failed to retreive list of repos");
      });

    } else {
      $scope.createdAt = GitHubService.formatDate($rootScope.repoInfo.created_at);
      $scope.lastUpdate = GitHubService.formatDate($rootScope.repoInfo.updated_at);
      setContributors($rootScope.repoInfo.contributors_url);
    }

    $scope.showContributorInfo = function(contributor) {
      if (contributor) {
        GitHubService.getUserInfo(contributor).then (function(data) {
          $rootScope.contributorInfo = data;
          $location.url('/contributor/' + contributor);
        })
      }
    }
  });



