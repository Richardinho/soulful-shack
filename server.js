var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 5000;
var bodyParser = require('body-parser');
var config;

if (process.argv[2] && process.argv[2] === 'test') {
  config = require('./test-config');
} else {
  config = require('./dev-config');
}

mongoose.connect(config.database);

var recordService = require('./app/record-service');
var userService = require('./app/user-mongo-service');
var multer = require('multer');

var apiRouter = require('./app/api')(express, config, recordService, userService, multer);

app.use(bodyParser.json());

app.use(express.static(__dirname + '/web'));
app.use(express.static(__dirname + '/node_modules/angular'));
app.use(express.static(__dirname + '/node_modules/angular-messages'));
app.use(express.static(__dirname + '/node_modules/angular-animate'));
app.use(express.static(__dirname + '/node_modules/angular-ui-router/release'));

app.use('/api', apiRouter);

//  for debugging only remove for production!!!
app.get('/users', function (request, response, next) {
  var apples = UserModel.find().then(function (users) {
    response.json(users);
  });
});

app.get('*', function (request, response) {
  response.sendFile(__dirname + '/web/index.html');
});

var UserModel = require('./app/models/user');

app.listen(port, function () {
  console.log('listening on port:', port);
});
