'use strict';



angular.module('myApp.services.firebaseservice', [])
.factory('FirebaseService', function($firebaseArray) {
  var ref = new Firebase("https://boiler-app.firebaseio.com/tracks");
  var sync = $firebaseArray(ref);


  return {
    all: function() {
      return sync;
    },
    get: function(tracksId) {
      // Simple index lookup
      return sync[tracksId];
    },
    save: function(selectedTrack, descrptionText) {
      sync.$add({
            title: selectedTrack.title,
            artist: selectedTrack.user.username,
            upload_time: Date.now(), 
            votes: 0,
            played: 0,
            descrption: descrptionText,
            trackSoundCloudId: selectedTrack.id,
            artwork_url: selectedTrack.artwork_url
        });
    },
    updateVote: function(track) {
        track.votes = track.votes + 1;
        var index = sync.$indexFor(track.$id);
        sync.$save(index);
    },
    updatePlayed: function(track) {
        track.played = track.played + 1;
        var index = sync.$indexFor(track.$id);
        sync.$save(index);
    }

  }


  // factory function body that constructs shinyNewServiceInstance
  return service;
});