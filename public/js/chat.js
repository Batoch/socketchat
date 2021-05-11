var socket = io();
socket.on('message', addMessage)
socket.on('init', removeall)
var id = 0;

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
	$("#messages").prepend(`
		<div class="media text-muted pt-3 " id="messagechat" style="height:60px;">
			<h4 class="media-body pb-3 mb-0 lh-125 border-bottom border-gray animated fade-in-text"> ${message.data.nom} : ${message.data.message} </h4>
		</div>`)
	}

function fetchMessages(){
	socket.emit('fetchmessages');
 }

function sendMessage(message){
	socket.emit('sendmessage', message);
 }
