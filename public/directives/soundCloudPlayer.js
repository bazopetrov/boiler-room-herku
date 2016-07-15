'use strict';

angular.module('myApp.directives.ngSoundcloud', [])
.directive('ngSoundcloud', function ($http) {
    function link(scope) {
      var clientid = 'b23455855ab96a4556cbd0a98397ae8c';
        $http({
            method: 'GET',
            url: 'http://api.soundcloud.com/tracks/'+scope.track+'.json?client_id='+clientid
        }).
        success(function (data) {
            scope.band = data.user.username;
            scope.title = data.title;
            scope.albumArt = data.artwork_url.replace("large", "t500x500");
            scope.wave = data.waveform_url;
            scope.stream = data.stream_url + '?client_id=' + clientid;
            scope.song = new Audio(scope.stream);
            scope.song.ontimeupdate = function(){
              var elapsedTime = scope.song.currentTime;
              var duration = scope.song.duration;
              var progress = (elapsedTime / duration) * 100;
              scope.$apply(function () {
                  scope.progress = progress;
              });
            }
        });
        scope.progress = 0;
        scope.playing = false;
        scope.started = false;
        scope.play = function () {
            scope.started = true;
            scope.playing = !scope.playing;
            if (!scope.playing) {
              scope.song.pause();
            }
            else
            {
              scope.song.play();
            }
        }
    }
    return {
        restrict: 'E',
        scope: {
            track: '=track',
        },
        template: document.getElementById('template').innerHTML,
        link: link
    };
})