document.addEventListener("deviceready", init, false);
var lastStatus = "";

function init() {

  //listen for changes
  document.addEventListener("offline", disableForm, false);
  document.addEventListener("online", enableForm, false);
  
  $("#searchButton").on("click", function(e) {
    var search = $("#searchField").val();
    if(search === "") return;

    //disable button while we search
    $(this).prop("disabled",true);

    $("#results").html("<i>Doing a search for "+search+"</i>");

    //ok, hit the API
    $.get("https://api.github.com/search/repositories", 
          {"q":search}, function(res,code) {
      if(res.items && res.items.length) {

        var defs = [];

        res.items.forEach(function(entry) {

            defs.push(
              $.Deferred(function(defer) {
                var date = new Date(Date.parse(entry.updated_at));
                navigator.globalization.dateToString(
                    date,
                    function (dateOb) { 
                      defer.resolve({
                        input:entry.updated_at, 
                        formatted:dateOb.value
                      });
                    },
                    function () { 
                      defer.resolve({
                        input:entry.updated_at, 
                        formatted:entry.updated_at
                      });
                    },
                    { formatLength: 'short', 
                      selector: 'date and time' }
                );
              })
            );

        });

        $.when.apply(null, defs).then(function() {
          var s = "<h2>Results</h2>";
          for(var i=0, len=res.items.length; i<len; i++) {
            var entry = res.items[i];
            s += "<p><strong>"+entry.name+"</strong><br/>";
            s += "By: " + entry.owner.login+"<br/>";
            s += "Updated: " + arguments[i].formatted+"<br/>";
            s += entry.description;
            s += "</p>";
          }
          $("#results").html(s);
        });

      }
      $("#searchButton").prop("disabled",false);
    });

  });
  
}

function disableForm() {
  $("#searchButton").prop("disabled", true);
  if(lastStatus != 'disconnected') {
    lastStatus = 'disconnected';
    navigator.notification.alert(
      "Search is disabled while you are offline.", 
      null, 
      "Offline!");
  }
}

function enableForm() {
  $("#searchButton").prop("disabled", false);
  if(lastStatus != 'connected' && lastStatus != '') {
    lastStatus = 'connected';
    navigator.notification.alert(
      "Search is now enabled.", 
      null, 
      "Online!");
  }
}