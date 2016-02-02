document.addEventListener("deviceready", init, false);
function init() {

  var s = "Your device is a " + device.model + ".";
  document.querySelector("#deviceArea").innerHTML = s;
    
}