
//var myApp = angular.module('escape:main', [])

angular.module('escape')

  .config(['$stateProvider', function ($stateProvider, ngAudio) {

    $stateProvider.state('jungle', {
      url: '/jungle',
      templateUrl: '/states/layout.html',
      controller: ['$rootScope', '$scope', '$interval', 'ngAudio', 'timeout',
        function ($rootScope, $scope, $interval, ngAudio, $timeout) {
// Hints logic
          $scope.layout = 'Quest';
          $scope.puzzles = [];
          $scope.hints = [
            { filename: 'audio/jungle/Introduction snake voice.wav', name: 'Introduction snake voice', volume: 1, repeat: false },
            { filename: 'audio/jungle/Round 1.wav', name: 'Round 1', volume: 1, repeat: false },
            { filename: 'audio/jungle/Round 2.wav', name: 'Round 2', volume: 1, repeat: false },
            { filename: 'audio/jungle/Round 3.wav', name: 'Round 3', volume: 1, repeat: false },
            { filename: 'audio/jungle/Completed the game.wav', name: 'Completed the game', volume: 1, repeat: false },
            { filename: 'audio/jungle/Touch animal footprints.wav', name: 'Touch animal footprints', volume: 1, repeat: false },
            { filename: 'audio/jungle/45 min remaining.wav', name: '45 min remaining', volume: 1, repeat: false },
            { filename: 'audio/jungle/30 min remaining.wav', name: '30 min remaining', volume: 1, repeat: false },
            { filename: 'audio/jungle/15 min remaining.wav', name: '15 min remaining', volume: 1, repeat: false },
            { filename: 'audio/jungle/10 min remaining.wav', name: '10 min remaining', volume: 1, repeat: false },
            { filename: 'audio/jungle/5 min remaining.wav', name: '5 min remaining', volume: 1, repeat: false },
            { filename: 'audio/jungle/2 min remaining.wav', name: '2 min remaining', volume: 1, repeat: false },
            { filename: 'audio/jungle/1 min remaining.wav', name: '1 min remaining', volume: 1, repeat: false }
          ]
// Timer logic
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
              timeController.timerProcess = null;
            }
          }

          timeController.timerReset = function () {
            timeController.timer.startTime = Date.now();
            timeController.timer.time = (new Date()).setHours(1, 0, 0, 0);
          }

          function TimerTick() {
            // Increment the time by the time difference now and the timer start time
            timeController.timer.time += timeController.timer.startTime - Date.now();
            // Reset the start time
            timeController.timer.startTime = Date.now();
          }
          function isTimerRunning() {
            return timeController.timerProcess;
          }

          timeController.playHint = function (hintAudio) {
            console.log('Playing sound', hintAudio);
            if ($scope.audio) $scope.audio.stop();
            $scope.audio = ngAudio.load(hintAudio);
            $scope.audio.play();
            // ngAudio.play (hintAudio);
          }

//room state logic 
          var loadTime = 1000, //Load the data every second
            errorCount = 0, //Counter for the server errors
            loadPromise; //Pointer to the promise created by the Angular $timout service
          var states = ['jungleS1rihno', 'jungleS1monkey', 'jungleS1lion', 'jungleS1elephant']
          $scope.GameStates = {};

          var getData = function () {
            states.forEach(function (state) {
              $http.get('http://192.168.1.6/jungle/' & state)
                .then(function (res) {
                  $scope.GameStates.state = res.data.args;
                  errorCount = 0;
                })
                .catch(function (res) {
                  $scope.ErrorMessage = 'Server error';
                });
            });              
              nextLoad(loadPromise, url);
          };

          var cancelNextLoad = function () {
            $timeout.cancel(loadPromise);
          };

          var nextLoad = function (mill) {
            mill = mill || loadTime;
            //Always make sure the last timeout is cleared before starting a new one
            cancelNextLoad();
            loadPromise = $timeout(getData, mill);
          };

          //Start polling the data from the server
          getData();

          //Always clear the timeout when the view is destroyed, otherwise it will keep polling and leak memory
          $scope.$on('$destroy', function () {
            cancelNextLoad();
          });
        }
      ]
    });
  }]);