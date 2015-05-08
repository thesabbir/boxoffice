var BoxOffice = angular.module('BoxOffice', ['ui.router'])
.controller('MainCtrl',function ($scope, $http) {
      $http.get('http://localhost:4000/movies').then(function (res) {
          $scope.movies = res.data;
          console.log(res.data[0]);

      });
    });