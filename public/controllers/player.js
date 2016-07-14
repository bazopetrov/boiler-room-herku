'use strict';

angular.module('myApp.controllers.player', [])

.controller('PlayerCtrl', function($scope, $rootScope, firebaseData, $routeParams) {
    var key = $routeParams.key;
    console.log("key for track to paly is : "+key);
});