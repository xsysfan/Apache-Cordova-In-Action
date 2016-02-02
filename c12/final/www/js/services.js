angular.module('rssappServices', [])
.factory('RSSService', function($q) {

	var entries;
	
	function getEntries(rss) {
		var deferred = $q.defer();
		//Do we have the entries already?
		if(entries && entries.length) {
			deferred.resolve(entries);
		} else {
			
			google.load("feeds", "1", {callback:function() {
				console.log("google load callback");
				var feed = new google.feeds.Feed(rss);
			
				feed.setNumEntries(10);
				feed.load(function(result) {
					if(!result.error) {
						entries = result.feed.entries;
						deferred.resolve(entries);
					} else {
						console.log("Error - "+result.error.message);
						deferred.fail(result.error.message);
					}
				});

			}});

		}
		return deferred.promise;
	}
	
	function getEntry(id) {
		var deferred = $q.defer();
		if(!entries || !entries.length) {
			deferred.fail("Entry does not exist.");
		} else {
			deferred.resolve(entries[id]);
		}
		return deferred.promise;
	}
	
	return {
		getEntries:getEntries,
		getEntry:getEntry
	}
});
