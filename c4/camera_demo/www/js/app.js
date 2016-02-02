document.addEventListener("deviceready", init, false);
function init() {

	function onSuccess(imageData) {
		console.log('success');
		var image = document.getElementById('myImage');
		image.src = imageData;
	}

	function onFail(message) {
		navigator.notification.alert(
			message, null, "Camera Failure");
	}	

	//Use from Camera
	document.querySelector("#takePicture").addEventListener("touchend", function() {
		navigator.camera.getPicture(onSuccess, onFail, { 
			quality: 50,
			sourceType: Camera.PictureSourceType.CAMERA,
			destinationType: Camera.DestinationType.FILE_URI
		});

	});

	//Use from Library
	document.querySelector("#usePicture").addEventListener("touchend", function() {
		navigator.camera.getPicture(onSuccess, onFail, { 
			quality: 50,
			sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
			destinationType: Camera.DestinationType.FILE_URI
		});

	});

}