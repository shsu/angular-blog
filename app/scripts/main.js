
require.config({
    baseUrl: '/scripts',
    paths: {
        jquery: '../vendor/jquery/dist/jquery',
        bootstrap: '../vendor/bootstrap/dist/js/bootstrap',
        toastr: '../vendor/toastr/toastr',

        angular: '../vendor/angular/angular',
        angularRoute: '../vendor/angular-route/angular-route',
        angularStorage: '../vendor/ngstorage/ngStorage.min'
    },
    shim: {
        bootstrap: ['jquery'],
        toastr: ['jquery'],

        angular: { exports: 'angular', deps: ['jquery'] },
        angularRoute: ['angular'],
        angularStorage: ['angular']
    },
    priority: ['jquery', 'angular']
});

require([
    'angular',
    'toastr',
    'post/app'
], function (angular, toastr, postApp) {
    angular.element(document).ready(function () {
        angular.bootstrap(document, [
            postApp.name
        ]);
    });

    toastr.options.positionClass = 'toast-bottom-right';
});
