
define([
	'angular',
	'post/controller',
  'post/routes'
], function (angular) {

	return angular.module('Post', [
		'Post.controllers',
      'Post.routes'
	]);
});
