'use strict';

angular.module('githubRepoViewerApp')
  .controller('MainCtrl', function ($scope, $rootScope, $location, GitHubService) {
    $scope.repoName = "";
    $rootScope.repoInfo;
    $scope.errors = [];

  	$scope.pullData = function() {

  		// check text input-> make http request to github-> redirect to repository page
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



