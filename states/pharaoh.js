
//var myApp = angular.module('escape:main', [])

angular.module('escape')
.config(['$stateProvider', function ($stateProvider, ngAudio) {

  $stateProvider.state('pharaoh', {
    url: '/pharaoh',
    templateUrl: '/states/layout.html',
    controller: ['$rootScope', '$scope', '$interval', 'ngAudio',
      function ($rootScope, $scope, $interval, ngAudio) {
        $scope.layout = 'Quest';
        $scope.puzzles = [];
        $scope.hints = [
          { filename: 'audio/pharaoh/My name is Hafra.wav', name: 'My name is Hafra', volume: 1, repeat: false},
          { filename: 'audio/pharaoh/Dark Laugh 2.wav', name: 'Dark Laugh 2', volume: 1, repeat: false},
          { filename: 'audio/pharaoh/Ghost effect.wav', name: 'Ghost effect', volume: 1, repeat: false},
          // { filename: 'audio/pharaoh/Round 3.wav', name: 'Round 3', volume: 1, repeat: false},
          { filename: 'audio/pharaoh/Tomb door open.wav', name: 'Tomb door open', volume: 1, repeat: false},
          { filename: 'audio/pharaoh/45 min remaining.wav', name: '45 min remaining', volume: 1, repeat: false},
          { filename: 'audio/pharaoh/30 min remaining.wav', name: '30 min remaining', volume: 1, repeat: false},
          { filename: 'audio/pharaoh/15 min remaining.wav', name: '15 min remaining', volume: 1, repeat: false},
          { filename: 'audio/pharaoh/2 min remaining.wav', name: '2 min remaining', volume: 1, repeat: false},
          { filename: 'audio/pharaoh/1 min remaining.wav', name: '1 min remaining', volume: 1, repeat: false},
          { filename: 'audio/pharaoh/Count down.wav', name: 'Count down', volume: 1, repeat: false},
          // { filename: 'audio/pharaoh/Completed the game.wav', name: 'Completed the game', volume: 1, repeat: false},
          { filename: 'audio/pharaoh/Out of time.wav', name: 'Out of time', volume: 1, repeat: false},
          { filename: 'audio/pharaoh/Congratulations at the end.wav', name: 'Congratulations at the end', volume: 1, repeat: false},
          { filename: 'audio/pharaoh/monster_growl.mp3', name: 'Monster Growl', volume: .3, repeat: false},
          { filename: 'audio/pharaoh/human-heartbeat.mp3', name: 'Human Heartbeat', volume: 1, repeat: false}
        ]
          console.log('quest');
        var timeController = $scope;

        timeController.timer = { time: (new Date()).setHours(0, 0, 0, 0), startTime: "", interval: 1000 };

        timeController.timerProcess;

        timeController.timerStart = function () {
          if (!isTimerRunning()) {
            // Register the interval and hold on to the interval promise
            timeController.timerProcess = $interval(TimerTick, timeController.timer.interval);
            // Reset the time to 0
            timeController.timerReset();              
          }
        }

        timeController.timerStop = function () {
          // If there is an interval process then stop it
          if (timeController.timerProcess) {
            $interval.cancel(timeController.timerProcess);
            timeController.timerProcess=null;
          }
        }

        timeController.timerReset = function () {
          timeController.timer.startTime = Date.now();
          timeController.timer.time = (new Date()).setHours(1, 0, 0, 0);
        }

        function TimerTick() {
          // Increment the time by the time difference now and the timer start time
          timeController.timer.time +=  timeController.timer.startTime- Date.now();
          // Reset the start time
          timeController.timer.startTime = Date.now();
        }
        function isTimerRunning() {
          return timeController.timerProcess;
        }

        timeController.playHint = function(hintAudio) {
          console.log('Playing sound', hintAudio);
          if ($scope.audio)  $scope.audio.stop();
          $scope.audio = ngAudio.load(hintAudio.filename);
          $scope.audio.volume(hintAudio.volume);
          $scope.audio.play();
          // ngAudio.play (hintAudio);
        }
      }

    ]
  });
}]);