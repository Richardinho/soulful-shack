var express = require('express');
var apiRouter = express.Router();
var recordService = require('./record-service');
var userService = require('./user-service');
var multer  = require('multer');


apiRouter.get('/records/:page/:minCost/:userRating/:stars/:sortby', function (request, response) {
	recordService.getRecordSummaries(
		request.params.page,
		request.params.minCost,
		request.params.userRating,
		request.params.stars,
		request.params.sortby).then(function (data) {
			response.json(data);
		}, function (error) {
				console.log(error);
				response.send([{
					"id" : "-1"
				}]);
			});
		});

apiRouter.get('/record/:id', function (request, response) {
	recordService.getRecord(request.params.id).then(function(data){
		response.json(data);
	}, function(error){
		console.log('error:', error);
		response.json({
			success : 'false'
		});
	});
});

var upload = multer({ dest: 'web/avatars/' })

function getFileSuffix(mimetype){
	var mimetypes = {
		'image/jpeg' : '.jpg'
	};
	return mimetypes[mimetype];
}

apiRouter.post('/order', function (request, response){
	response.json({ success : true });
});

apiRouter.post('/register', upload.single('avatar'), function (request, response) {
	userService.registerUser(request.body, request.file).then(function(user){

		response.json({ success : true, user : user });
	}).catch(function() {
		console.log('something went wrong');
		response.json({ success : false });
	});
});

apiRouter.post('/signin', function (request, response){
	userService.retrieveUser(request.body.email, request.body.password).then(function(user){
		response.json({ success : true, user : user });
	}).catch(function(message) {
		console.log('something went wrong', message);
		response.json({ success : false, message : message });
	});
});

apiRouter.get('/register/:name', function(request, response){
	response.json(userService.retrieveUser(request.params.name));
});

module.exports = apiRouter;