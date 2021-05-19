const socket = io();
socket.on('message', addMessage)
socket.on('init', removeall)

$(() => {
    $("#send").click(()=>{
		let message = $("#message").val()
    	if (message !== ""){
			if(message.length > 150){
				message = message.substring(0, 150)
			}

			sendMessage({
				message: message
			})
		}
    	else {
			$('.toast').toast('show');
		}
	})
	fetchMessages()
	const input = document.getElementById("all");
	input.addEventListener("keyup", function(event) {
		if (event.key === "Enter") {
			event.preventDefault();
			document.getElementById("send").click();
		}
	});
	document.querySelector("textarea").addEventListener("input", event => {
		const target = event.currentTarget;
		const maxLength = target.getAttribute("maxlength");
		const currentLength = target.value.length;

		if (currentLength >= maxLength) {
			document.getElementById("textsize").classList = "float-end btn disabled alert-danger"
		}
		else if (currentLength >= (maxLength - 20)) {
			document.getElementById("textsize").classList = "float-end btn disabled alert-warning"
		}
		else{
			document.getElementById("textsize").classList = "float-end btn disabled alert-info"
		}
		document.getElementById("textsize").innerHTML = currentLength + "/" + maxLength
	});



})

function removeall(){
	document.getElementById("messages").innerHTML="";
	}

function addMessage(message){
	$("#messages").prepend(`
		<div class="media text-muted pt-3" id="messagechat" style="height:60px;">
			<h4 class="text-break media-body pb-3 mb-0 lh-125 border-bottom border-gray animated fade-in-text"> ${message.name} : ${message.message} </h4>
		</div>`)
	}

function fetchMessages(){
	socket.emit("fetchmessages");
 }

function sendMessage(message){
	socket.emit("sendmessage", message);
 }
