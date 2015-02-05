'use strict';

angular.module('githubRepoViewerApp')
  .controller('RepoInfoCtrl', function ($scope, $rootScope, $routeParams, $location, GitHubService) {
    $scope.owner = $routeParams.owner;
    $scope.repo = $routeParams.name;
    $scope.contributors;
    $rootScope.contributorInfo;

    var setContributors = function(url) {
      GitHubService.getContributors(url).then (function(data) {
        $scope.contributors = data;
      }, function(reason) {
        console.log("FD");
      });
    }

    if (!$rootScope.repoInfo) {
      var repoInfo = $scope.owner + '/' + $scope.repo;

      GitHubService.getRepository(repoInfo).then (function(data) {
        $rootScope.repoInfo = data;
        setContributors(data.contributors_url);
      }, function(reason) {
        console.log("FD");
      });

    } else {
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



     /* var promise = GitHubService.getRepository(repoInfo);
      promise.then(function(repoInfo) {
        $rootScope.repoInfo = repoInfo.data;


      }, function(reason) {
        console.log("fail");
      });
    }

    var promise2 = GitHubService.getContributors($rootScope.repoInfo.contributors_url);
      promise2.then(function(response) {
        $scope.contributors= response.data;
      }, function(reason) {
        console.log("fail");
      }); */
  });



