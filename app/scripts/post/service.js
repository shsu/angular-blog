
define(['angular', 'angularStorage'], function (angular) {

	return angular.module('Post.services', ['ngStorage'])

  .service('Post', ['$localStorage', function($localStorage) {

    $localStorage.$default({ posts: [{
        id: '1',
        author: 'author',
        timestamp: new Date(),
        title: 'title',
        body: 'adwadawdawdawdawdawd',
        deleted: false
      }, {
        id: '2',
        author: 'author',
        timestamp: new Date(),
        title: 'title',
        body: 'ladwadwadawd',
        deleted: false
      }, {
        id: '3',
        author: 'author',
        timestamp: new Date(),
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
});
