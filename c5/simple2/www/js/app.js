document.addEventListener("deviceready", init, false);
function init() {

	//listen for button clicks
	document.querySelector("#nameForm").addEventListener("submit", 
		function(e) {
			e.preventDefault();
			var name = document.querySelector("#name").value;
			var msg = "Hello, "+name;
			document.querySelector("#result").innerText = msg;
	}, false);

}