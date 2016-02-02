angular.module('rssappControllers', [])

.controller('EntriesCtrl', ['$ionicPlatform', '$scope', 'RSSService', 'settings', function($ionicPlatform, $scope, RSSService, settings) {
	
  $ionicPlatform.ready(function() {

    $scope.title = settings.TITLE;	
		RSSService.getEntries(settings.RSS_URL).then(function(entries) {
			$scope.entries = entries;
		}, function(err) {
			console.log("error", err);
		});
	
	});
	
}])

.controller('EntryCtrl', ['$scope', 'RSSService', '$stateParams', function($scope, RSSService, $stateParams) {

	RSSService.getEntry($stateParams.index).then(function(entry) {
		$scope.entry = entry;
	}, function(err) {
		console.log("error", err);
	});
	
}]);
