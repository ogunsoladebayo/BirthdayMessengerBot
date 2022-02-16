import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import ErrorResponse from "../utils/errorResponse";

/**
 *  @desc      Support for verification requests to the webhook
 *  @route     GET /webhook
 *  @access    Public
 * */
export const connectHook = asyncHandler(async (req: Request, res: Response, next) => {
	const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

	const mode = req.query["hub.mode"];
	const token = req.query["hub.verify_token"];
	const challenge = req.query["hub.challenge"];

	// Checks if a token and mode is in the query string of the request
	if (!mode || !token) return next(new ErrorResponse("Invalid token or mode set", 400));
	// Checks the mode and token sent is correct
	if (mode === "subscribe" && token === VERIFY_TOKEN) {
		// Responds with the challenge token from the request
		console.log("WEBHOOK_VERIFIED");
		res.status(200).send(challenge);
	} else {
		// Responds with '403 Forbidden' if verify tokens do not match
		res.sendStatus(403);
	}
});

/**
 *  @desc      Handler for webhook events
 *  @route     POST /webhook
 *  @access    Public
 * */
export const handleEvent = asyncHandler(async (req: Request, res: Response, next) => {
	const body = req.body;
	console.dir(body, { depth: null });

	// Check if this is an event from a page subscription
	if (body.object === "page") {
		// Returns a '200 OK' response to all requests
		res.status(200).send("EVENT_RECEIVED");

		// Iterate over each entry - there may be multiple if batched
		body.entry.forEach(async function (entry) {
			// Iterate over webhook events - there may be multiple
			entry.messaging.forEach(async function (webhookEvent) {
				// Discard uninteresting events
				if ("read" in webhookEvent) {
					console.log("Got a read event");
					return;
				} else if ("delivery" in webhookEvent) {
					console.log("Got a delivery event");
					return;
				} else if (webhookEvent.message && webhookEvent.message.is_echo) {
					console.log("Got an echo of our send, mid = " + webhookEvent.message.mid);
					return;
				}

				// Get the sender PSID
				const senderPsid = webhookEvent.sender.id;

				// if (!(senderPsid in users)) {
				// 	// First time seeing this user
				// 	let user = new User(senderPsid);
				// 	let userProfile = await GraphApi.getUserProfile(senderPsid);
				// 	if (userProfile) {
				// 		user.setProfile(userProfile);
				// 		users[senderPsid] = user;
				// 		console.log(`Created new user profile:`);
				// 		console.log({ user });
				// 	}
				// }
				// i18n.setLocale(users[senderPsid].locale);
				// let receiveMessage = new Receive(users[senderPsid], webhookEvent);
				// return receiveMessage.handleMessage();
			});
		});
	} else {
		// Return a '404 Not Found' if event is not from a page subscription
		res.sendStatus(404);
	}
});
