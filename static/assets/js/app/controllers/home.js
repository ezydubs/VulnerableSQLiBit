var controllers = angular.module('controllers');

controllers.controller('admin', function ($scope, $http) {
  $http.get('/api/users/all').then(function (res) {
    $scope.users = res.data;
  });
});
