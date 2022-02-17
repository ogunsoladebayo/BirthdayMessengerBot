import { User } from "../entities";
import GraphApi from "./graph-api";

export default class ReceiveHandler {
	user: User;
	webhookEvent: any;
	constructor(user: User, webhookEvent: any) {
		this.user = user;
		this.webhookEvent = webhookEvent;
	}

	// Check if the event is a message or postback and
	// call the appropriate handler function
	handleMessage() {
		const event = this.webhookEvent;

		let responses: { text: string }[];

		try {
			if (event.message) {
				const message = event.message;
				if (message.text) {
					// responses = this.handleTextMessage();
				}
			} else if (event.postback) {
				responses = this.handlePostback();
			}
		} catch (error) {
			console.error(error);
			responses = [
				{
					text: `An error has occured: '${error}'. We have been notified and \
        will fix the issue shortly!`
				}
			];
		}

		if (Array.isArray(responses)) {
			let delay = 0;
			for (const response of responses) {
				this.sendMessage(response, delay * 2000);
				delay++;
			}
		} else {
			this.sendMessage(responses);
		}
	}

	// Handles postbacks events
	handlePostback() {
		const postback = this.webhookEvent.postback;

		let payload: string;
		if (postback.payload) {
			// Get the payload of the postback
			payload = postback.payload;
		}
		return this.handlePayload(payload.toUpperCase());
	}

	handlePayload(payload) {
		let response: { text: string }[];

		// Set the response based on the payload
		if (payload === "GET_STARTED") {
			response = [{ text: "Hi!" }, { text: "Please enter your first name" }];
		} else {
			response = [
				{
					text: `This is a default postback message for payload: ${payload}!`
				}
			];
		}

		return response;
	}

	sendMessage(response, delay = 0) {
		// Check if there is delay in the response
		if ("delay" in response) {
			delay = response["delay"];
			delete response["delay"];
		}

		// Construct the message body
		const requestBody = {
			recipient: {
				id: this.user.user
			},
			message: response
		};

		setTimeout(() => GraphApi.callSendApi(requestBody), delay);
	}
}
