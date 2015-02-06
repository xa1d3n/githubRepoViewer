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
    },

    /*
      Formats GMT date
    */
    formatDate: function(dateInput) {
      var date = new Date(dateInput);
      var month = this.formatMonth(date.getMonth());
      var day = date.getDate();
      var year = date.getFullYear();

      var formatedDate = month + " " + day + ", " + year;
      return formatedDate;
    },

    /*
      * Return name of current month
    */
    formatMonth: function(month) {
     var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var thisMonth = months[month];
        return thisMonth;
    }




  }

  });
