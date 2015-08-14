define(['angular', 'angularRoute'], function (angular) {

	return angular.module('Post.routes', ['ngRoute'])

    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/create', {
          templateUrl: '/scripts/post/partials/create.html',
          controller: 'PostController',
          action: 'create'
        })

        .when('/:id', {
          templateUrl: '/scripts/post/partials/view.html',
          controller: 'PostController',
          action: 'view'
        })

        .when('/:id/edit', {
          templateUrl: '/scripts/post/partials/edit.html',
          controller: 'PostController',
          action: 'edit'
        })

        .when('/', {
          templateUrl: '/scripts/post/partials/list.html',
          controller: 'PostController',
          action: 'list'
        });

      // $locationProvider.html5Mode(true);
    }]);
});
