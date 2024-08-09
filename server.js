/*jshint node:true*/
'use strict';

var express = require('express'),
	socket = require('./server/socket.js'), 
    http = require('http');
    
var app = express();

var port = process.env.PORT || 7203;

var environment = process.env.NODE_ENV;

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

app.get('/ping', function(req, res, next) {
    console.log(req.body);
    res.send('pong');
});

switch (environment) {
    case 'build':
        console.log('** BUILD **');
        app.use(express.static('./build/'));
        app.use('/*', express.static('./build/index.html'));
        break;
    default:
        console.log('** DEV **');
        app.use(express.static('./src/'));
        app.use(express.static('./'));
        app.use(express.static('./tmp'));
        app.use('/*', express.static('./src/index.html'));
        break;
}


// Hook Socket.io into Express
var server = http.createServer(app);
var io = require('socket.io').listen(server);
io.on('connection', socket);

server.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
                '\n__dirname = ' + __dirname +
                '\nprocess.cwd = ' + process.cwd());
}); 