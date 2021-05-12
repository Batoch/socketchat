const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const firebase = require("firebase");
const fs = require('fs');
const yaml = require('js-yaml')
const config = require('./config');
let socketmessage

try {
	let fileContents = fs.readFileSync('./socketmsg.yaml', 'utf8');
	socketmessage = yaml.load(fileContents);
} catch (e) {
	console.log(e);
}

const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

firebase.initializeApp(config.firebaseConfig)
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
	socket.on(socketmessage.fetchmessages, () =>{
		console.log("Request received.");
		initmessages();
	});
	socket.on(socketmessage.sendmessage, (msg) =>{
		console.log("New message.");
		getmessage(msg);
	});
})

function initmessages(){
	console.log("startget")
	function getdb(valeur){
		const messages = [];
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
	let {name, message} = msg;

	// HTML injection prevention
	name = name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
	message = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");

	// Send to db
	const date = Date.now();
	const newmsgRef = database.ref('messages').push();

	let nom = name
	let data = {nom, message};
	let dict = {date, data}

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

