//server.js
'use strict';

// Require the libraries:
var express = require('express');
var fs = require('fs');
var path = require('path');
var http = require('http');
var mime = require('mime');
var SocketIOFileUpload = require('socketio-file-upload');
var socketio = require('socket.io');
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
var cookieParser = require('cookie-parser');
var session = require('express-session');
var multer  =require('multer');
var app = express();

var config = require('./config.json');

app.use(SocketIOFileUpload.router);
app.use(express.static(__dirname + '/public_html'));
app.use(bodyParser.json());  // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded;
app.use(cookieParser());
app.use(session({
	secret: 'xw1qq2uiagkhat5m',
	resave: false,
	saveUninitialized: true
}));

function restrict(req, res, next) {
  if (req.session.username) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/acceder');
  }
}

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('fileattach');

var server = http.createServer(app);
var io = socketio.listen(server);  //pass a http.Server instance
server.listen(3000, function() {
	console.log('App listening on port 80');
});

function getFilesizeInBytes(filename) {
	var stats = fs.statSync(filename);
	var fileSizeInBytes = stats.size; // bytes
	return Math.round(fileSizeInBytes);
}

function parseCookies (request) {
	var list = {},
	rc = request.headers.cookie;
	rc && rc.split(';').forEach(function( cookie ) {
		var parts = cookie.split('=');
		list[parts.shift().trim()] = decodeURI(parts.join('='));
	});
	return list;
}

// Start up Socket.IO:
//var app_tickets = {};

io.sockets.on('connection', function(socket, req){
    var uploader = new SocketIOFileUpload();
    uploader.dir = __dirname + '/uploads/_temp/';
    uploader.listen(socket);

    uploader.on('start', function(event){
    	var newdirectory = '';
    	if (event.file.meta.dest) {
    		newdirectory = __dirname + '/uploads/' + event.file.meta.dest;
				if (newdirectory !== '') {
					if (!fs.existsSync(newdirectory)) {
						fs.mkdirSync(newdirectory);
					}
					uploader.dir = newdirectory;
				}
    	}
    });
    uploader.on('saved', function(event){
        // console.log('[Server] saved: ', event.file.pathName);
        event.file.clientDetail.pathName = event.file.pathName;
    });

    // Error handler:
    uploader.on('error', function(event){
        console.log('Error from uploader');
    });
});

//
app.post('/api/partes', upload, function(req, res, next) {
	var result = [];

	result.push(req.body);

	res.contentType('application/json');
  res.json(JSON.stringify(result));
});
// app.post('/api/parte/:nrocta/:nrofor', upload, function(req, res, next) {
//   res.json(req.body);
// });
app.put('/api/parte/:nrocta/:nrofor', function(req, res, next) {
  res.json(req.body.parte);

		// switch (req.method) {
		// 	case 'POST':
		// 		accion = 'consulta';
		// 		break;
		// 	case 'PUT':
		// 		accion = 'alta';
		// 		break;
		// }

		// if (_.contains(req.decoded.acciones, accion)) {
		// 	next();
		// } else {
		// 	res.status(401).json({
		// 		success: false,
		// 		message: 'Not authorized'
		// 	})
		// }

});
app.post('/api/habilitacion', upload, function(req, res, next) {
  res.json(req.body);
});
app.post('/api/contactos', upload, function(req, res, next) {
  res.json(req.body);
});
app.post('/acceder', function(req, res, next) {
	// res.status(401).send({error:'Clave incorrecta'});
	var options = {
		host: config.login_host,
		port: config.login_port,
		path: config.login_path,
		headers: { 'uid': req.body.uid, 'pwd': req.body.pwd }
	};

	http.get(options, function(response) {
		var body = '';
		response.on('data', function(d) {
			body += d;
		});
		response.on('end', function() {
			var parsed = JSON.parse(body);

			if (parsed.token) {

				res.cookie('token', parsed.token);
				res.cookie('username', parsed.username);
				res.cookie('actions', parsed.actions.join(','));
				res.cookie('empresa_name', parsed.empresa.name);
				res.cookie('empresa_logo', parsed.empresa.logo);
				res.cookie('lastLogin', (parsed.lastLogin !== null) ? parsed.lastLogin : Date.now());
				// guardarStorage(parsed.token,
				// 							parsed.username,
				// 							parsed.actions.join(','),
				// 							parsed.empresa.name,
				// 							parsed.empresa.logo,
				// 							parsed.lastLogin)
				req.session.username = parsed.username;
			}
			res.status(response.statusCode).send(parsed);
		});

	});
});

app.get('/api/user/resetpw', function(req, res) {
	res.json({uid: req.body.uid, message: 'Enviado'});

});

// Rutas de nuestro API
// GET de tareas los TODOs
app.get('/download/:folder/:file', function(req, res) {
	var cookies = parseCookies(req);
  var file = __dirname + '/uploads/'+ cookies.username +'/'+ req.params.folder +'/'+ req.params.file;

  var filename = path.basename(file);
  var mimetype = mime.lookup(file);

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', 'application/force-download');
  res.setHeader('Content-type', mimetype);

  var filestream = fs.createReadStream(file);
  filestream.pipe(res);
});
app.get('/intercambio/:file', function(req, res) {
	var cookies = parseCookies(req);
  var file = __dirname + '/zonaintercambio/'+ req.params.file;

  var filename = path.basename(file);
  var mimetype = mime.lookup(file);

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', 'application/force-download');
  res.setHeader('Content-type', mimetype);

  var filestream = fs.createReadStream(file);
  filestream.pipe(res);
});

//
app.delete('/api/intercambioarchivos/:file', function(req, res, next) {
	var cookies = parseCookies(req);
	var filePath = __dirname + '/uploads/'+ cookies.username +'/intercambio/'+ req.params.file;
	fs.unlinkSync(filePath);
  res.json([{'deleted': true, 'file': req.params.file}]);
});

//
app.get('/api/intercambioarchivos/:username?', function(req, res) {
	var files = [];
	// var cookies = parseCookies(req);
	var username = (req.params.username) ? req.params.username : req.cookies.username;
	if (typeof username === 'undefined') {
		// res.json(files);
		res.status(404);
	}
	var folder = './uploads/'+ username +'/';

	if (!fs.existsSync(folder)) {
		fs.mkdirSync(folder);
		fs.mkdirSync(folder);
		// res.json(files);
	}
	folder += 'intercambio/';
	if (!fs.existsSync(folder)) {
		fs.mkdirSync(folder);
	}
	fs.readdir(folder, function(err, data) {
		if (err) {
			res.json();
			// res.json(err);
		}

		for (var i = data.length - 1; i >= 0; i--) {
			if (!data[i].startsWith('.')) {
				files.push({
					url: '/download/intercambio/'+ data[i],
					name: data[i],
					size: getFilesizeInBytes(folder + data[i]),
					mine: mime.lookup(data[i])
				});
			}
		}
		res.json(files);
	});
});

app.get('/api/parte/:nrocta/:nrofor/:detail?', function(req, res) {
	var filename = __dirname + '/public_html/_api/parte/'+ req.params.nrocta +'/'+ req.params.nrofor + (req.params.detail ? '/'+ req.params.detail : '') + '.json';
	res.sendFile(filename);
});

app.get('/api/:code/:subcode?', function(req, res) {
	var url = req.params.code + (req.params.subcode ? '/'+ req.params.subcode : '');
	var filename = __dirname + '/public_html/_api/'+ url +'.json';
	// res.header('Access-Control-Allow-Origin', '*');
 //  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.sendFile(filename);
});

app.get('/login', function(req, res) {
	res.sendFile(__dirname + '/public_html/_api/login.json');
	// res.status(401).sendFile(__dirname + '/public_html/_api/login_error.json');
});

app.get('/acceder', function(req, res) {
  if (!req.session.username) {
		res.sendFile(__dirname + '/public_html/login.html');
	} else {
		res.redirect('/');
	}
});

app.get('/views/:page', restrict, function(req, res) {
    res.sendFile('./public_html/views/'+ req.params.page +'.html');
});
app.get('/config.js', function(req, res) {
	res.sendFile(__dirname + '/config.js');
});
app.get('/salir', function(req, res) {
	res.clearCookie('token');
	res.clearCookie('username');
	res.clearCookie('actions');
	res.clearCookie('lastLogin');
	res.clearCookie('empresa_name');
	res.clearCookie('empresa_logo');
	req.session.destroy(function(err) {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/acceder');
		}
	});
});

// app.post('/accediendo', function(req, res) {
// 	req.session.logged = true;
// 	req.session.username = req.cookies.username;
// 	res.json({'valid': true});
// 	// res.redirect('/');
// });

app.get('/', restrict, function(req, res) {
	res.sendFile(__dirname + '/public_html/main.html');
});

app.get('/*', restrict, function(req, res) {
	res.redirect('/');
});
