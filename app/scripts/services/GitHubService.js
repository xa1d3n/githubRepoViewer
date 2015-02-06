'use strict';

angular.module('githubRepoViewerApp')
  .service('GitHubService', function ($http, $q) {

  return {
    getRepository: function(repositoryName) {
      if (repositoryName) {
        var deferred = $q.defer();
        $http.get("https://api.github.com/repos/" + repositoryName)
          .success(function(data) {
            deferred.resolve(data);
          })
          .error(function(data, status, headers, config) {
             deferred.reject(data);
          }); 
          return deferred.promise;
      }
    },
    
    getGithubData: function(url) {
      if (url) {
        var deferred = $q.defer();
        $http.get(url)
          .success(function(data) {
            deferred.resolve(data);
          })
          .error(function(data, status, headers, config) {
             deferred.reject(data);
          }); 
          return deferred.promise;
      }
    },

    getUserInfo: function(user) {
      if (user) {
        var deferred = $q.defer();
        $http.get('https://api.github.com/users/' + user) 
          .success(function(data) {
            deferred.resolve(data);
          })
          .error(function(data) {
            deferred.reject(data);
          });
          return deferred.promise;
      }
    }


  }

  });
