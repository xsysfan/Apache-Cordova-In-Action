angular.module('rssappControllers', [])

.controller('EntriesCtrl', ['$ionicPlatform', '$location', '$scope', 'RSSService', 'settings',
function($ionicPlatform, $location, $scope, RSSService, settings) {

	$ionicPlatform.ready(function() {

		var network = navigator.connection.type;
		if(network == Connection.NONE) {
			$location.path('/offline');
		}

		window.plugins.spinnerDialog.show(null, "Loading RSS", true);

		$scope.title = settings.TITLE;
		RSSService.getEntries(settings.RSS_URL).then(function(entries) {
			window.plugins.spinnerDialog.hide();
			$scope.entries = entries;
		}, function(err) {
			window.plugins.spinnerDialog.hide();
			console.log("error", err);
		});

	});

}])

.controller('EntryCtrl', ['$scope', 'RSSService', '$stateParams', '$timeout', function($scope, RSSService, $stateParams, $timeout) {

	$scope.readEntry = function(e) {
		window.open(e.link, "_blank");
	};

	$scope.shareEntry = function(e) {
		window.plugins.socialsharing.share("","",null, e.link);
	}

	RSSService.getEntry($stateParams.index).then(function(entry) {
		$scope.entry = entry;
	}, function(err) {
		console.log("error", err);
	});

}]);
