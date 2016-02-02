window.onerror = function(e) {
  console.log('global err', e);
}

document.addEventListener("deviceready", init, false);
function init() {
  
  //Handler for first button
  $("#runOne").on("touchend", function(e) {
    //this doesn't exist!
    doX();
  });

  //Handler for second button
  $("#runTwo").on("touchend", function(e) {
    console.log("I clicked the second button.");
  });

  //Handler for third button
  $("#runThree").on("touchend", function(e) {
    $.get("thisdoesntexist.html", function(res) {
      console.log("result",res);
    });
  });
  
}