
'use strict';

angular.module('escape')
.config(['$stateProvider', function ($stateProvider, ngAudio) {

  $stateProvider.state('wizard', {
    url: '/wizard',
    templateUrl: '/states/layout.html',
    controller: ['$rootScope', '$scope', '$interval', 'ngAudio', '$mdDialog', '$http',
      function ($rootScope, $scope, $interval, ngAudio, $mdDialog, $http) {
        $scope.layout = 'Quest';
        $scope.puzzles = [];
        $scope.hints = [
          { filename: 'audio/pharaoh/My name is Hafra.wav', name: 'My name is Hafra', volume: 1, repeat: false},
          { filename: 'audio/pharaoh/Dark Laugh 2.wav', name: 'Dark Laugh 2', volume: 1, repeat: false}

        ]
        var GAME_NAME='wizard';
        console.log(GAME_NAME, ' Loaded');
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

        timeController.timerPlus = function () {
          // If there is an interval process then stop it
          if ((new Date(timeController.timer.time)).getMinutes() < 60)
            timeController.timer.time = (new Date(timeController.timer.time)).setMinutes((new Date(timeController.timer.time)).getMinutes() + 1) ;
        }

        timeController.timerMinus = function () {
          // If there is an interval process then stop it
          if ((new Date(timeController.timer.time)).getMinutes() > 0)
            timeController.timer.time = (new Date(timeController.timer.time)).setMinutes((new Date(timeController.timer.time)).getMinutes() - 1) ;
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
          $scope.isSoundPlaying = true;
          console.log('Playing sound', hintAudio);
          if ($scope.audio)  $scope.audio.stop();
          $scope.audio = ngAudio.load(hintAudio.filename);
          $scope.audio.volume = hintAudio.volume;
          $scope.audio.play();
          // ngAudio.play (hintAudio);
        }

        timeController.stopSound = function() {
          $scope.isSoundPlaying = false;
          $scope.audio.stop();
        }

        $scope.showConfirm = function(ev) {
          // Appending dialog to document.body to cover sidenav in docs app
          var confirm = $mdDialog.confirm()
                .title('Are you sure you want to Reset Game')
                .textContent('All locks will open and game will revert to initial stage')
                .ariaLabel('Reset')
                .targetEvent(ev)
                .ok('Yes, I am sure')
                .cancel('OOPS!! No! BACK!');
      
          $mdDialog.show(confirm).then (function() {
            resetQuest();
          });
        };

        $scope.loadQuest = function () {
          $scope.isLoading = true;
          $http.get('http://localhost:8080/game/' + GAME_NAME + '/state').then( (data, status) => {
            console.log(data.data);
            $scope.GameStates = data.data;
            $scope.isLoading = false;
          }, err=> {
              console.log('Error with NODE SERVICE');
          });
        };

        var resetQuest =  function () {
              $scope.isLoading = true;
              $scope.GameStates = [];
              $http.post('http://localhost:8080/game/' + GAME_NAME).then( (data, status) => {
                console.log(data.data);
                $scope.GameStates = data.data;
                $scope.isLoading = false;
              }, err=> {
                  console.log('Error with NODE SERVICE');
              });
        }

        $scope.activatePuzzle = function(item) {
          console.log(item,' ', $scope.GameStates.indexOf(item)); 
          item.solved= true;
        }
      }

    ]
  });
}]);
