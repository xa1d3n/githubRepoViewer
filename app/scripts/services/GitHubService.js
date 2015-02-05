'use strict';

angular.module('githubRepoViewerApp')
  .service('GitHubService', function ($http, $q) {


    //https://api.github.com/users/

  return {
    getRepository: function(repositoryName) {
     // return $http.get('https://api.github.com/repos/' + repositoryName);

     /* return $http.get('https://api.github.com/repos/' + repositoryName).then(function(result) {
           return result.data;
       }); */

      /*$http.get("https://api.github.com/repos/" + repositoryName)
        .success(function(data) {
          return data;
        })
        .error(function(data, status, headers, config) {
          return;
        }); */

      var deferred = $q.defer();
      $http.get("https://api.github.com/repos/" + repositoryName)
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(data, status, headers, config) {
           deferred.reject(data);
        }); 
        return deferred.promise;
    },

    getContributors: function(url) {

      var deferred = $q.defer();
      $http.get(url)
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(data, status, headers, config) {
           deferred.reject(data);
        }); 
        return deferred.promise;
    },

    getUserInfo: function(user) {
      var deferred = $q.defer();
      $http.get('https://api.github.com/users/' + user) 
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(data) {
          deferred.reject(data);
        });
        return deferred.promise;
    },

    getUserRepositories: function(url) {
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


  }

  });
