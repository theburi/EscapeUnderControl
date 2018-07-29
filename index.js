
'use strict';

angular.module('escape', [
  'ui.router',
  'ngMaterial',
  'ngAudio'
])

  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/main');

    $stateProvider.state('main', {
      url: '/main',
      templateUrl: 'assets/home.html',
      controller: ['$rootScope', '$scope',
        function ($rootScope, $scope) {
          $scope.theme = 'green';     
          $scope.changeTheme = function(val) {
            $scope.theme = val; 
            console.log(val)
          };          
          console.log('main');
        }
      ]
    });
  }]);




