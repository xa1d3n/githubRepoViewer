'use strict';

angular.module('githubRepoViewerApp')
  .controller('RepoInfoCtrl', function ($scope, $routeParams, $location, GitHubService) {
    $scope.owner = $routeParams.owner;
    $scope.repo = $routeParams.name;
    $scope.createdAt;
    $scope.lastUpdate;
    $scope.errors = [];
    $scope.contributors;
    $scope.contributorInfo;

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

      var repoInfo = $scope.owner + '/' + $scope.repo;

      GitHubService.getRepository(repoInfo).then (function(data) {
        $scope.repoInfo = data;
        $scope.createdAt = GitHubService.formatDate($scope.repoInfo.created_at);
        $scope.lastUpdate = GitHubService.formatDate($scope.repoInfo.updated_at);
        setContributors(data.contributors_url);
      }, function(reason) {
        $scope.errors.push("Failed to retreive list of repos");
      });

    /*
     * Go to the contributor page.
     * @param {string} contributor - name of github user
     */
    $scope.showContributorInfo = function(contributor) {
      if (contributor) {
        GitHubService.getUserInfo(contributor).then (function(data) {
          $scope.contributorInfo = data;
          $location.url('/contributor/' + contributor);
        })
      }
    }
  });



