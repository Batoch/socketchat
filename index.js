const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const firebase = require("firebase");

const http = require('http');
var server = http.createServer(app);
const io = require('socket.io')(server);

var firebaseConfig = {
    apiKey: "AIzaSyA1QHv3v6D1tFCFO3NxSh2so1xC8t--Lwg",
    authDomain: "chat-6c8d4.firebaseapp.com",
    databaseURL: "https://chat-6c8d4-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chat-6c8d4",
    storageBucket: "chat-6c8d4.appspot.com",
    messagingSenderId: "1746856943",
    appId: "1:1746856943:web:0fa4e7666f0d1fc8b3241a",
    measurementId: "G-TPR8NZZMHT"
};
firebase.initializeApp(firebaseConfig)
let database = firebase.database()
var newmsgRef = database.ref('messages');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap


server.listen(3000, () => {
    console.log("server started on port 3000");
});


io.on('connection', (socket) =>{
	console.log('a user is connected')
	socket.on('fetchmessages', () =>{
		console.log("Request received.");
		initmessages();
	});
	socket.on('sendmessage', (msg) =>{
		console.log("New message.");
		getmessage(msg);
	});
})

function initmessages(){
	console.log("startget")
	function getdb(valeur){
		var messages = [];
		io.emit('init');
		if(valeur != null){
			Object.entries(valeur).forEach(([key, value]) => {
				nom = value.name
				message = value.message
				date = value.date
				data = {nom, message};
				dict = {date, data}
				messages.push(dict);
				io.emit('message', dict);
			})
		}
		io.emit('messages', messages);
		return messages
	}

	newmsgRef.once('value', (valeur) => getdb(valeur.val()));
}

function getmessage(msg){
	var {name, message} = msg;
	// Send to db
	var date = Date.now();
	var newmsgRef = database.ref('messages').push();

	nom = name
	data = {nom, message};
	dict = {date, data}

	io.emit('message', dict);

	newmsgRef.set({
		name, message, date
	});
}

app.get("/", (req, res) => {
    res.render("index"); // index refers to index.ejs
});

// app.get('/messages', (req, res) => {
// 	console.log("startget")
//
// 	function getdb(valeur){
// 		var messages = [];
// 		io.emit('init');
// 		if(valeur != null){
// 			Object.entries(valeur).forEach(([key, value]) => {
// 				nom = value.name
// 				message = value.message
// 				date = value.date
// 				data = {nom, message};
// 				dict = {date, data}
// 				messages.push(dict);
// 				io.emit('message', dict);
// 				//console.log(value.name, ": ", value.message);
// 			})
// 		}
// 	return messages
// 	}
//
// 	newmsgRef.once('value', (valeur) => getdb(valeur.val()));
// })

// app.post('/messages', (req, res) => {
// 	var {name, message} = req.body;
// 	// Send to db
// 	var date = Date.now();
// 	var newmsgRef = database.ref('messages').push();
//
// 	nom = name
// 	data = {nom, message};
// 	dict = {date, data}
//
// 	//io.emit('message', dict);
//
// 	newmsgRef.set({
// 		name, message, date
// 	});
// })

