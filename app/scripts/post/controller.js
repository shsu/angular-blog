

define(['angular', 'post/service'], function (angular) {

	return angular.module('Post.controllers', ['Post.services'])

  .controller('PostController', ['$scope', '$location', '$route', '$routeParams', 'Post', function ($scope, $location, $route, $routeParams, Post){
    $scope.list = function () {
      Post.list(function (err, data) {
        $scope.posts = data;
      });
    };

    $scope.create = function () {
      $scope.newPost = {};
    };

    $scope.add = function () {
      Post.add($scope.newPost, function (err, data) {
        $location.path('/');
      });
    };

    $scope.view = function () {

      var id = $routeParams.id;

      Post.get(id, function (err, data) {
        $scope.currPost = data;
      });
    };

    $scope.edit = function () {
      var id = $routeParams.id;

      Post.get(id, function (err, data) {
        $scope.currPost = data;
      });
    };

    $scope.update = function (id) {
      Post.update(id, $scope.currPost, function (err, data) {
        $scope.posts = data;
        $location.path('/');
      });
    };

    $scope.remove = function (id) {
      Post.remove(id, function (err, data){
        $scope.posts = data;
				$location.path('/');
      });
    };
    if ($route.current.action) {
      $scope[$route.current.action]();
    }

  }]);
});
