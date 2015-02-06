'use strict';

angular.module('githubRepoViewerApp')
  .controller('MainCtrl', function ($scope, $rootScope, $location, GitHubService) {
    $scope.repoName = "";
    $rootScope.repoInfo;
    $scope.errors = [];

  	$scope.pullData = function() {
  		if ($scope.repoName) {

			GitHubService.getRepository($scope.repoName).then (function(data) {
		  		$rootScope.repoInfo = data;
		  		$location.url('/owner/' + $rootScope.repoInfo.owner.login + '/repo/' + $rootScope.repoInfo.name);
		  	}, function(reason) {
		  		$scope.errors.push("No Repository Information Found");
		  	});
  		} 
  	};
  });



