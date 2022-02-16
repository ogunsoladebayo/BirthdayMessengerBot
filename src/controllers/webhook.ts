import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import ErrorResponse from "../utils/errorResponse";

/**
 *  @desc      Support for GET requests to the webhook
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
