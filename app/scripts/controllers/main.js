'use strict';

angular.module('githubRepoViewerApp')
  .controller('MainCtrl', function ($scope, $rootScope, $location, GitHubService) {
    $scope.repoName = "";
    $rootScope.repoInfo;

  	$scope.pullData = function() {
  		if ($scope.repoName) {
  			/* GitHubService.getRepository($scope.repoName).then(function(data) {
       			$rootScope.repoInfo = data;
   			}); */

	   		/*var promise = GitHubService.getRepository($scope.repoName);
			promise.then(function(repoInfo) {
			  $rootScope.repoInfo = repoInfo.data;
			  $location.url('/owner/' + $rootScope.repoInfo.owner.login + '/repo/' + $rootScope.repoInfo.name);
			}, function(reason) {
			  console.log("fail");
			}); */
	GitHubService.getRepository($scope.repoName).then (function(data) {
  		$rootScope.repoInfo = data;
  		$location.url('/owner/' + $rootScope.repoInfo.owner.login + '/repo/' + $rootScope.repoInfo.name);
  	}, function(reason) {
  		console.log("FD");
  	});


  		}
  	};
  });



