'use strict';

angular.module('myApp.controllers.home', [])

// Home controller
.controller('HomeCtrl', function($scope, $rootScope, firebaseData) {
     $scope.isCollapsed = true;

     $scope.timeback = 5;

     $scope.title = "Hello World!";
        $scope.scroll = true;
        $scope.duration = 10000;
        $scope.duplicated = true;

     $scope.animateLeft  = function(){
     	$(".wrapper").animate({
		        left: "-100%"
		    }, 1000);
     }

     $scope.animateRight = function(){
     	$(".wrapper").animate({
		        left: "0"
		    }, 1000);
     }
});
