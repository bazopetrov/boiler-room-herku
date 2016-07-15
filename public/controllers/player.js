'use strict';

angular.module('myApp.controllers.player', [])

.controller('PlayerCtrl', function($http, $scope, $rootScope, $routeParams, FirebaseService) {
	$rootScope.showBack = true;
	var keyFromRouth = $routeParams.key;
	var urlPath = window.location.href;
	var pathArrayAtt = urlPath.split("/");
	var indexOf = pathArrayAtt.length - 1;
	var key = pathArrayAtt[indexOf];

	if(keyFromRouth){
		$scope.reload = true;
	}
	
	
    $scope.trackKeyFb = key;
    $scope.trackKey = '';

    $scope.tracks = [];
    loadTracks();

    function loadTracks(){
        $scope.tracks = FirebaseService.all();
        if($scope.tracks.length <= 0){
        	
        	setTimeout(function(){loadFireBaseTrackItem()},2000);
        }else{
        	 loadFireBaseTrackItem();     
        }
        
         

    }

    $scope.loadNextTrack = function(){
    	if ($scope.playing) {
    		$scope.song.pause();
    	}
    	var index = $scope.tracks.$indexFor($scope.trackKeyFb);
    	index = index + 1;
    	if(index >= $scope.tracks.length){
    		index = 0;
    	}
    	$scope.track = $scope.tracks[index];
    	$scope.trackKeyFb = $scope.track.$id;
    	$scope.trackKey = $scope.track.trackSoundCloudId;
    	loadFireBaseTrackItem();
    	$scope.play();
    }

    $scope.loadPrevTrack = function(){
    	if ($scope.playing) {
    		$scope.song.pause();
    	}
    	var index = $scope.tracks.$indexFor($scope.trackKeyFb);
    	index = index - 1;
    	if(index<0){
    		index = $scope.tracks.length-1;
    	}
    	$scope.track = $scope.tracks[index];
    	$scope.trackKeyFb = $scope.track.$id;
    	$scope.trackKey = $scope.track.trackSoundCloudId;
    	
    	loadFireBaseTrackItem();
    	$scope.play();
    }

     $scope.voteForTrack = function(track){
        FirebaseService.updateVote(track);
        /*track.votes = track.votes + 1;
        var index = $scope.tracks.$indexFor(track.$id);
        $scope.tracks.$save(index);*/
    }

    function loadFireBaseTrackItem(){
    	var index = $scope.tracks.$indexFor($scope.trackKeyFb);
    	$scope.track = $scope.tracks[index];
    	$scope.trackKey = $scope.track.trackSoundCloudId;
    	loadTrackForPlay();
    }

    $scope.stopPlay = function(){
    	if ($scope.playing) {
    		$scope.play();
    	}
    	
		window.location = "#/home";  
    }

    $scope.play = function() {
                $scope.playing = !$scope.playing;
                if (!$scope.playing) {
                    $scope.song.pause();
                    $( "#playBtnId" ).removeClass( "fa-pause" );
                    $( "#playBtnId" ).addClass( "fa-play" );
                    
                } else {
                    if ($scope.song.src == '') {
                        $scope.song.src = $scope.stream;
                    }
                    $( "#playBtnId" ).removeClass( "fa-play" );
                    $( "#playBtnId" ).addClass( "fa-pause" );
                    $scope.song.play();
                }
    }

    function loadTrackForPlay(){
    	var clientid = 'b23455855ab96a4556cbd0a98397ae8c';
            $http({
                method: 'GET',
                url: 'http://api.soundcloud.com/tracks/' + $scope.trackKey + '.json?client_id=' + clientid
            }).
            success(function(data) {
                $scope.band = data.user.username;
                $scope.bandUrl = data.user.permalink_url;
                $scope.title = data.title;
                $scope.trackUrl = data.permalink_url;
                $scope.albumArt = data.artwork_url.replace("large", "t500x500");
                $scope.wave = data.waveform_url;
                $scope.stream = data.stream_url + '?client_id=' + clientid;
                $scope.song = new Audio();
            });
            $scope.playing = false;
            
       
    }

});