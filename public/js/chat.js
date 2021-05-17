const socket = io();
socket.on('message', addMessage)
socket.on('init', removeall)

$(() => {
    $("#send").click(()=>{
    	let name = $("#name").val()
		let message = $("#message").val()
    	if (name !== "" && message !== ""){

			if(name.length > 150){
				name = name.substring(0, 150)
			}
			if(message.length > 150){
				message = message.substring(0, 150)
			}

			sendMessage({
				name: name,
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
})

function removeall(){
	document.getElementById("messages").innerHTML="";
	}

function addMessage(message){
	$("#messages").prepend(`
		<div class="media text-muted pt-3 " id="messagechat" style="height:60px;">
			<h4 class="media-body pb-3 mb-0 lh-125 border-bottom border-gray animated fade-in-text"> ${message.name} : ${message.message} </h4>
		</div>`)
	}

function fetchMessages(){
	socket.emit("fetchmessages");
 }

function sendMessage(message){
	socket.emit("sendmessage", message);
 }
