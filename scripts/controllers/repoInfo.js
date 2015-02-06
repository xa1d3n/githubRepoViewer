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

    /*
     * Retreive list of contributors related to repo
     * @param {url} url - github url
     */
    var setContributors = function(url) {
      GitHubService.getGithubData(url).then (function(data) {
        $scope.contributors = data;
      }, function(reason) {
        $scope.errors.push("Failed to retreive contributors");
      });
    }

    /*
     * Check rootscope containing repo info.
     * Make http request if it's null.
     */
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

    /*
     * Go to the contributor page.
     * @param {string} contributor - name of github user
     */
    $scope.showContributorInfo = function(contributor) {
      if (contributor) {
        GitHubService.getUserInfo(contributor).then (function(data) {
          $rootScope.contributorInfo = data;
          $location.url('/contributor/' + contributor);
        })
      }
    }
  });



