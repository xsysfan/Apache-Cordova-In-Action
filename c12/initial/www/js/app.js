angular.module('starter', ['ionic','rssappControllers','rssappServices','rssappConfig'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('Entries', {
			url: '/', 
			controller: 'EntriesCtrl', 
			templateUrl: 'partials/entries.html',
		})
		.state('Entry', {
			url: '/entry/:index',
			controller: 'EntryCtrl', 
			templateUrl: 'partials/entry.html',
		});

	$urlRouterProvider.otherwise("/");

}])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
