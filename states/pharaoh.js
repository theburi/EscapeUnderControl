
//var myApp = angular.module('escape:main', [])

angular.module('escape')
.config(['$stateProvider', function ($stateProvider, ngAudio) {

  $stateProvider.state('pharaoh', {
    url: '/pharaoh',
    templateUrl: '/states/layout.html',
    controller: ['$rootScope', '$scope', '$interval', 'ngAudio',
      function ($rootScope, $scope, $interval, ngAudio) {
        $scope.layout = 'Quest';
        $scope.puzzles = [
          { name: 'puzzle 1', description: 'Puzzle 1 long description', status: 'COMPLETE', type: 'LOCK_CONTROLLED', hint: ['This is hint 1', 'This is hint 2'] },
          { name: 'puzzle 2', description: 'puzzle 2', status: 'ACTIVE', type: 'LOCK', hint: ['This is hint 1', 'This is hint 2'] },
          { name: 'puzzle 3', description: 'puzzle 2', status: 'UNAVAILABLE', type: 'ARDUINO_CONTROLLED' },
          { name: 'puzzle 4', description: 'puzzle 2', status: 'UNAVAILABLE', type: 'LOCK_CONTROLLED', hint: ['This is hint 1', 'This is hint 2'] }];
        $scope.hints = [
          { filename: 'audio/Ghost effect.wav', name: 'Ghost effect', volume: 1, repeat: false},
          { filename: 'audio/Tomb door open.wav', name: 'Tomb door open', volume: 1, repeat: false}
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
          // var sound = ngAudio.load('audio/song2.mp3');
          // sound.play();
          ngAudio.play (hintAudio);
        }
      }

    ]
  });
}]);