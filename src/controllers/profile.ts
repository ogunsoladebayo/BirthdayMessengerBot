import { Request, Response } from "express";
import config from "../config";
import asyncHandler from "../middlewares/asyncHandler";
import Profile from "../utils/profile";

export const setup = asyncHandler(async (req: Request, res: Response, next) => {
	// Set up our App's Messenger Profile
	const token = req.query["verify_token"];
	const mode = req.query["mode"];

	if (!config.webhookUrl.startsWith("https://")) {
		res.status(403).send("ERROR - Need a proper API_URL in the .env file");
	}
	const profile = new Profile();

	// Check if a token and mode is in the query string of the request
	if (mode && token) {
		if (token === config.verifyToken) {
			if (mode == "webhook" || mode == "all") {
				profile.setWebhook();
				res.write(`<p>&#9989; Set app ${config.appId} call to ${config.webhookUrl}</p>`);
			}
			res.status(200).end();
		} else {
			// Responds with '403 Forbidden' if verify tokens do not match
			res.sendStatus(403);
		}
	} else {
		// Returns a '404 Not Found' if mode or token are missing
		res.sendStatus(404);
	}
});
