var express = require('express');
var hotelService = require('./app/hotel-service');

var app = express();
var port = process.env.PORT || 5000;

app.use(express.static('./web'));

app.get('/api/hotels/:page/:minCost/:userRating/:stars/:sortby', function (request, response) {
	hotelService.getHotelSummaries(
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

app.get('/api/hotel/:id', function (request, response) {
	hotelService.getHotel(request.params.id).then(function(data){
		response.json(data);
	}, function(error){
		console.log('error:', error);
		response.json({
			success : 'false'
		});
	});
});

app.post('/api/order', function (request, response){

	response.json({ success : true });

});

app.get('*', function (request, response) {
	response.sendFile(__dirname + '/web/index.html');
});

app.listen(port, function () {
	console.log('listening on port:', port);
});