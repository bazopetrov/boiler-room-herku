'use strict';



angular.module('myApp.services.soundcloud', [])
.factory('SoundcloudService', function($http) {
  var service = {};
  var clientId = "731611aaeaf4b8b2ed55406ee818ee61";
  var clientSecret = "cda118816836f964cff8a3f5d3c73c44";

  service.getArtistTracks = getArtistTracks;

  function getArtistTracks(artist) {
    return $http.get('http://api.soundcloud.com/users/' + artist + '/tracks.json?client_id='+clientId).then(handleSuccess, handleError('Error getting tracks'));
  };

  function handleSuccess(res) {

    return { success: true, data: res.data };
            
  }

  function handleError(error) {
    return function () {
        return { success: false, message: error };
    };
  }


  // factory function body that constructs shinyNewServiceInstance
  return service;
});