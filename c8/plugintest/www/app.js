document.addEventListener("deviceready", init, false);

function init() {
  
  $("#testButton").on("touchend", function(e) {
    var name = $("#nameField").val();
    if(name === "") return;
      
    window.helloplugin.sayHello(name, 
        function(result) {
            $("#results").html("Result from plugin:<br/>"+result);
        },
        function(err) {
            $("#results").html("Error from plugin:<br/>"+err);
        }
    );
      
  });
  
}
