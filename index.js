


angular.module('escape', [
  'ui.router',
  'ngMaterial',
  'ngAudio'
])
.config(function ($mdThemingProvider) {
  $mdThemingProvider.theme('green')
    .primaryPalette('indigo')
    .accentPalette('pink');

  $mdThemingProvider.theme('amber')
    .primaryPalette('lime')
    .accentPalette('orange')
    .warnPalette('blue');

  // This is the absolutely vital part, without this, changes will not cascade down through the DOM.
  $mdThemingProvider.alwaysWatchTheme(true);
})


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




