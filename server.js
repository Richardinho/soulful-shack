var express = require("express");
var app = express();
var port = process.env.PORT || 2000;
var bodyParser = require("body-parser");

var recordService = require("./app/record-service");
var userService = require("./app/user-service");

var multer = require("multer");

var apiRouter = require("./app/api")(
	express,
	recordService,
	userService,
	multer
);

app.use(bodyParser.json());

app.use(express.static(__dirname + "/web"));
app.use(express.static(__dirname + "/node_modules/angular"));
app.use(express.static(__dirname + "/node_modules/angular-messages"));
app.use(express.static(__dirname + "/node_modules/angular-animate"));
app.use(express.static(__dirname + "/node_modules/angular-ui-router/release"));

app.use("/api", apiRouter);

//  for debugging only remove for production!!!
app.get("/users", function (request, response, next) {
	var apples = UserModel.find().then(function (users) {
		response.json(users);
	});
});

app.get("*", function (request, response) {
	response.sendFile(__dirname + "/web/index.html");
});

app.listen(port, function () {
	console.log("listening on port:", port);
});
