"use strict";

module.exports = function (express, recordService, userService, multer) {
	var apiRouter = express.Router();

	apiRouter.get(
		"/records/:page/:minCost/:userRating/:stars/:sortby",
		function (request, response) {
			recordService
				.getRecordSummaries(
					request.params.page,
					request.params.minCost,
					request.params.userRating,
					request.params.stars,
					request.params.sortby
				)
				.then(
					(data) => {
						response.json(data);
					},
					(error) => {
						console.log(error);
						response.send([
							{
								id: "-1",
							},
						]);
					}
				);
		}
	);

	apiRouter.get("/record/:id", function (request, response) {
		recordService.getRecord(request.params.id).then(
			(data) => {
				response.json(data);
			},
			(error) => {
				console.log("error:", error);
				response.json({
					success: "false",
				});
			}
		);
	});

	var upload = multer({ dest: "web/avatars/" });

	apiRouter.post("/order", (request, response) => {
		response.json({ success: true });
	});

	/*
	 *  todo: We should send out an email in response to registration which asks the user to click on a link
	 *  to confirm their registration. If they are already registered, it will simply give a link for them
	 *  to reset their password if they wish.
	 */

	apiRouter.post(
		"/register",
		upload.single("avatar"),
		function (request, response) {
			userService
				.registerUser(request.body, request.file)
				.then((user) => {
					response.json({ success: true, user: user });
				})
				.catch((error) => {
					//  log error, but simply report failure to user
					console.log("something went wrong", error);
					response.json({ success: false });
				});
		}
	);

	apiRouter.post("/signin", function (request, response) {
		userService
			.retrieveUser(request.body.email, request.body.password)
			.then((user) => {
				response.json({ success: true, user: user });
			})
			.catch((message) => {
				console.log("something went wrong", message);
				response.json({ success: false, message: message });
			});
	});

	apiRouter.get("/register/:name", (request, response) => {
		response.json(userService.retrieveUser(request.params.name));
	});

	return apiRouter;
};
