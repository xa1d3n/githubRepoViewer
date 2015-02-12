'use strict';

angular.module('githubRepoViewerApp')
  .controller('MainCtrl', function ($scope, $location, GitHubService) {
    $scope.repoName = "";
    $scope.repoInfo;
    $scope.errors = [];

  	$scope.pullData = function() {

  		// check text input-> make http request to github-> redirect to repository page
  		if ($scope.repoName) {
			GitHubService.getRepository($scope.repoName).then (function(data) {
		  		$scope.repoInfo = data;
		  		$location.url('/owner/' + $scope.repoInfo.owner.login + '/repo/' + $scope.repoInfo.name);
		  	}, function(reason) {
		  		$scope.errors.push("No Repository Information Found");
		  	});
  		} 
  	};
  });



