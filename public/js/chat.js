var socket = io();
socket.on('message', addMessage)
socket.on('init', removeall)

$(() => {
    $("#send").click(()=>{
		sendMessage({
			name: $("#name").val(), 
			message:$("#message").val()})
	})
	fetchMessages()
})

function removeall(){
	var element = document.getElementById("messages");
	element.innerHTML="";
	}

function addMessage(message){
	var element = document.getElementById("messages");
	$("#messages").prepend(`
		<div class="message" style="border: 1px solid silver;height:60px;">
		<h4> Nom: ${message.data.nom} </h4>
		<p> Message: ${message.data.message} </p>
		</div>`)
	}

function fetchMessages(){
	socket.emit('fetchmessages');
	console.log("fetchmessages");
 }

function sendMessage(message){
	socket.emit('sendmessage', message);
 }
