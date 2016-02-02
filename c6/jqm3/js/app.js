var deviceReadyDeferred = $.Deferred();
var jqmReadyDeferred = $.Deferred();

document.addEventListener("deviceready", deviceReady, false);

function deviceReady() {
  deviceReadyDeferred.resolve();
}

$(document).on("mobileinit", function () {
  jqmReadyDeferred.resolve();
});

$.when(deviceReadyDeferred, jqmReadyDeferred).then(init);

function init() {
  
  $(document).on("touchend", "#showMotion", function(e) {
    e.preventDefault();
    navigator.accelerometer.getCurrentAcceleration(
      gotMotion, onMotionError);
  });

  $(document).on("touchend", "#showOrientation", function(e) {
    e.preventDefault();
    navigator.compass.getCurrentHeading(
      gotOrientation, onOrientationError);
  });
  
}

function gotMotion(acc) {
  var s = "";
  s += "X Motion: "+acc.x + "<br/>";
  s += "Y Motion: "+acc.y + "<br/>";
  s += "Z Motion: "+acc.z + "<br/>";
  s += "Timestamp: "+acc.timestamp;
  
  $("#motionData").html(s);
}

function onMotionError(e) {
  $("#motionData").html("Error! "+e.toString());
}

function gotOrientation(heading) {
  var s = "";
  s += "Heading: "+heading.magneticHeading + "<br/>";
  s += "Accuracy: "+heading.headingAccuracy + "<br/>";
  s += "Timestamp: "+heading.timestamp;
  
  $("#orientationData").html(s);
}

function onOrientationError(e) {
  if(e.code === CompassError.COMPASS_INTERNAL_ERR) {
    $("#orientationData").html("Error! An internal error.");
  } else if(e.code === CompassError.COMPASS_NOT_SUPPORTED) {
    $("#orientationData").html("Error! No compass.");    
  } else {
    $("#orientationData").html("Error! Unknown error.");
  }
}
