'use strict';

angular.module('githubRepoViewerApp')
  .controller('ContributorInfoCtr', function ($scope, $rootScope, $location, $routeParams, GitHubService) {
    $scope.contributor = $routeParams.contributor;
    $scope.joined;
    $scope.repositories;
    $scope.errors = [];

    /*
     * Retreive reposities data related to current user
     * @param {url} url - github url
     */
    var setRepositories = function(url) {
        GitHubService.getGithubData(url).then (function(data) {
          $scope.repositories = data;
      }, function(reason) {
        $scope.errors.push("Failed to retreive repositories");
      });
    }

    /*
     * Check rootscope containing contributor info.
     * Make http request if it's null.
     */
     if (!$rootScope.contributorInfo) {
        GitHubService.getUserInfo($scope.contributor).then (function(data) {
          $rootScope.contributorInfo = data;
          $scope.joined = GitHubService.formatDate($rootScope.contributorInfo.created_at);
          setRepositories($rootScope.contributorInfo.repos_url);
        }, function(reason) {
          $scope.errors.push("Failed to retreive user information");
      });
     }
     else {
      $scope.joined = GitHubService.formatDate($rootScope.contributorInfo.created_at);
        setRepositories($rootScope.contributorInfo.repos_url);
     }

    /*
     * Go to the repository page.
     * @param {string} repository - name of github repository
     */
   $scope.showRepoInfo = function(repository) {
    $location.url('/owner/' + $scope.contributor + '/repo/' + repository);

   }

  });



