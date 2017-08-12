


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
          console.log('main')
        }
      ]
    });
  }]);



// app.run(['$rootScope', '$state', 
//   function ($rootScope, $state) {
//     // Expose state and stateParams to rootScope
//     $rootScope.$state = $state;
//     $rootScope.$on('$stateChangeSuccess', function (ev, $state, $stateParams) {
//       $rootScope.$stateParams = $stateParams;
//     });

//     // Support state redirection
//     $rootScope.$on('$stateChangeStart', function (ev, toState, toParams) {
//       if (toState.redirectTo) {
//         ev.preventDefault();
//         ev.noUpdate = true;
//         $state.go(toState.redirectTo, toParams);
//       }
//     });

//   }
// ]);



