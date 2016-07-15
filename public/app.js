'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngAnimate',
    'smart-table',
    'myApp.services.firebaseservice',
    'firebase',
    'ui.bootstrap',
    'myApp.lib.services',
    'myApp.directives.myDirective',
    'ngSoundcloud',
    'myApp.services.soundcloud',
    'myApp.controllers.player',
    'myApp.controllers.home', 'angular-marquee'
])

.config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/home', {
        title: 'Home',
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
    });

    $routeProvider.when('/callback', {
        title: 'callback',
        templateUrl: 'templates/callback.html',
        controller: 'HomeCtrl'
    });

    $routeProvider.when('/player/:key', {
        title: 'Home',
        templateUrl: 'templates/player.html',
        controller: 'PlayerCtrl'
    });

    $routeProvider.otherwise({
        redirectTo: '/home'
    });

}])

.run(['$rootScope', function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);
