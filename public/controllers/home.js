'use strict';

angular.module('myApp.controllers.home', [])


// Home controller
.controller('HomeCtrl', function($scope, $rootScope, $firebase, SoundcloudService) {


    $scope.tracks = [];

    $scope.tracksObj;

    loadTracks();

    function loadTracks(){
        var ref = new Firebase("https://boiler-app.firebaseio.com/tracks");
        var fb = $firebase(ref);  
        var syncObject = fb.$asArray();
        

        console.log(syncObject.lenght)
    }


    $scope.saveTrackOnFireBase = function() { 
        var ref = new Firebase("https://boiler-app.firebaseio.com/tracks/"+$scope.selectedTrack.id);  
        var fb = $firebase(ref);   

        fb.$set({
          
            title: $scope.selectedTrack.title,
            votes: 0,
            played: 0,
            descrption: $scope.descrptionText,
            trackSoundCloudId: $scope.selectedTrack.id
          
        });    

    };

     $scope.loginUserSoundCloud;
     $scope.descrptionText = '';
     $scope.step2SubmitBtn = true;


     $scope.isCollapsed = true;
     $scope.step1= true;
     $scope.step2= false;
     $scope.step3= false;
     $scope.step4= false;

     $scope.playTrack = function(track){
        window.location = "#/player/"+track;
       
     }



     function loadScript(url, callback)
        {
            // Adding the script tag to the head as suggested before
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;

            // Then bind the event to the callback function.
            // There are several events for cross browser compatibility.
            script.onreadystatechange = callback;
            script.onload = callback;

            // Fire the loading
            head.appendChild(script);
        }

     var Initialize = function() {

        SC.initialize({
            client_id: '731611aaeaf4b8b2ed55406ee818ee61',
            redirect_uri: 'http://localhost:8000/app/templates/callback.html'
        });

        
    };

    loadScript("http://connect.soundcloud.com/sdk/sdk-3.0.0.js", Initialize); 

     $scope.loginToSoundCloud = function(){
       SC.connect().then(function() {
          return SC.get('/me');
        }).then(function(me) {
          $scope.loginUserSoundCloud = me;
          loadTracksForUser();
        });
       
     }



     var loadTracksForUser = function(){
        $scope.searchArtist = $scope.loginUserSoundCloud.permalink;
        
        SoundcloudService.getArtistTracks($scope.searchArtist).then(function(data) {
          $scope.artistTracks = data.data;
          
        })
        $scope.searchArtist = '';
        $scope.swapStep(2);
     }

     $scope.selectedTrack = function(track){
        $scope.selectedTrack = track;
        $( "#step2-submit-btn" ).removeClass( "disabled" );
        $scope.step2SubmitBtn = false;
        
     }

     $scope.submitYourTrack = function(){
        $scope.swapStep(3);
     }

     $scope.saveTrackOnServer = function(){
        $scope.swapStep(4);
        $scope.saveTrackOnFireBase();
        //call the firebase to store the track.
     }


     $scope.swapStep =  function(num){
            
        if(num === 1){
            $( "#step1" ).addClass( "step-blue" );
            
             $scope.step1= true;
             $scope.step2= false;
             $scope.step3= false;
             $scope.step4= false;
         }else if(num === 2){
            $( "#step2" ).addClass( "step-blue" );
             $scope.step1= false;
             $scope.step2= true;
             $scope.step3= false;
             $scope.step4= false;
         }else if(num === 3){
            $( "#step3" ).addClass( "step-blue" );
             $scope.step1= false;
             $scope.step2= false;
             $scope.step3= true;
             $scope.step4= false;
         }else if(num === 4){
            $( "#step4" ).addClass( "step-blue" );
             $scope.step1= false;
             $scope.step2= false;
             $scope.step3= false;
             $scope.step4= true;
         }else{
             $scope.step1= true;
             $scope.step2= false;
             $scope.step3= false;
             $scope.step4= false;
         }
     }

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

     $scope.connectWithSoundCloud = function(){
        console.log("click registered.");
     }
});
