var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var apiRouter = require('./app/api');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/web'));
app.use('/api', apiRouter);
app.get('*', function (request, response) {
	response.sendFile(__dirname + '/web/index.html');
});

app.listen(port, function () {
	console.log('listening on port:', port);
});