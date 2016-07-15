/* ngSoundcloud | By Alain Galvan | Public Domain */
var app = angular.module("ngSoundcloud", []);

app.directive('ngScTrack', ['$http',
    function($http) {
        function link(scope) {
            var clientid = 'b23455855ab96a4556cbd0a98397ae8c';
            $http({
                method: 'GET',
                url: 'http://api.soundcloud.com/tracks/' + scope.track + '.json?client_id=' + clientid
            }).
            success(function(data) {
                scope.band = data.user.username;
                scope.bandUrl = data.user.permalink_url;
                scope.title = data.title;
                scope.trackUrl = data.permalink_url;
                scope.albumArt = data.artwork_url.replace("large", "t500x500");
                scope.wave = data.waveform_url;
                scope.stream = data.stream_url + '?client_id=' + clientid;
                scope.song = new Audio();
            });
            scope.playing = false;
            scope.play = function() {
                scope.playing = !scope.playing;
                if (!scope.playing) {
                    scope.song.pause();
                    $( "#playBtnId" ).removeClass( "fa-pause" );
                    $( "#playBtnId" ).addClass( "fa-play" );
                    
                } else {
                    if (scope.song.src == '') {
                        scope.song.src = scope.stream;
                    }
                    $( "#playBtnId" ).removeClass( "fa-play" );
                    $( "#playBtnId" ).addClass( "fa-pause" );
                    scope.song.play();
                }
            }
        }
        return {
            restrict: 'E',
            scope: {
                track: '=track',
            },
            templateUrl: "templates/ng-sc-track.html",
            link: link
        };
    }
]);