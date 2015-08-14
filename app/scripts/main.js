(function(){
  var app = angular.module('app', ['ngStorage', 'ngRoute']);

  app.controller('BlogController', function($scope, $location, $route, $routeParams, Post){
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
      });
    };

    if ($route.current.action) {
      $scope[$route.current.action]();
    }

  });

  app.service('Post', ['$localStorage', function($localStorage){

    $localStorage.$default({ posts: [{
        id: '1',
        author: 'author',
        timestamp: '123123223',
        title: 'title',
        body: 'adwadawdawdawdawdawd',
        deleted: false
      }, {
        id: '2',
        author: 'author',
        timestamp: '123123223',
        title: 'title',
        body: 'ladwadwadawd',
        deleted: false
      }, {
        id: '3',
        author: 'author',
        timestamp: '123123223',
        title: 'title',
        body: 'ladwadwadawd',
        deleted: false
      }]});

    function list (callback) {
      callback(null, $localStorage.posts);
    }

    function add (newPost, callback) {
      $localStorage.posts.push({
        id: ($localStorage.posts.length + 1).toString(),
        author: newPost.author,
        title: newPost.title,
        timestamp: new Date(),
        body: newPost.body,
        deleted: false
      });
      callback(null, $localStorage.posts)
    }

    function get (id, callback) {
      $localStorage.posts.forEach(function (post) {
        if (post.id === id) {
          callback(null, post);
        }
      });
    }

    function update (id, post, callback) {
      for (var i in $localStorage.posts) {
        if ($localStorage.posts[i].id === id) {
          $localStorage.posts[i] = {
            id: id,
            author: post.author,
            title: post.title,
            body: post.body,
            timestamp: post.timestamp,
            deleted: false
          };
          callback(null, $localStorage.posts);
          break;
        }
      }
    }

    function remove (id, callback) {
      for (var i in $localStorage.posts) {
        if ($localStorage.posts[i].id === id) {
          $localStorage.posts[i].deleted = true;
          callback(null, $localStorage.posts);
          break;
        }
      }
    }
    return {
      list: list,
      add: add,
      get: get,
      update: update,
      remove: remove
    };
  }]);

  app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider

    .when('/create', {
      templateUrl: '/partials/create.html',
      controller: 'BlogController',
      action: 'create'
    })

    .when('/:id', {
      templateUrl: '/partials/view.html',
      controller: 'BlogController',
      action: 'view'
    })

    .when('/:id/edit', {
      templateUrl: '/partials/edit.html',
      controller: 'BlogController',
      action: 'edit'
    })

    .when('/', {
      templateUrl: '/partials/list.html',
      controller: 'BlogController',
      action: 'list'
    });

    // $locationProvider.html5Mode(true);
  }]);

})();
