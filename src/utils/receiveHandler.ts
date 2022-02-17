import { QueryOrder } from "@mikro-orm/core";
import { DI } from "../app";
import { Message, User } from "../entities";
import Birthday from "../services/birthday";
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
	async handleMessage() {
		const event = this.webhookEvent;

		let responses: { text: string }[];

		try {
			if (event.message) {
				const message = event.message;
				if (message.text) {
					responses = await this.handleTextMessage();
					this.user.messages.add(new Message(message.mid, message.text));
					await DI.userRepository.persistAndFlush(this.user);
				}
			} else if (event.postback) {
				this.user.messages.add(new Message(event.postback.mid, event.postback.title));
				await DI.userRepository.persistAndFlush(this.user);

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

	// Handles messages events with text
	async handleTextMessage() {
		const event = this.webhookEvent;

		// check if user has just initiated a chat
		await DI.em.populate(this.user, ["messages"], { orderBy: { messages: { createdAt: QueryOrder.DESC } } });
		const lastMessage = this.user.messages[0].text;

		let response;

		// TODO: handle "Start Over"
		if (lastMessage.toLowerCase().includes("get started")) {
			this.user.name = event.message.text;
			await DI.em.persistAndFlush(this.user);
			response = Birthday.handlePayload("INITIALIZE", this.user.name);
		} else {
			response = [{ text: "Sorry, I don't understand that. Please try again." }];
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

		setTimeout(async () => await GraphApi.callSendApi(requestBody), delay);
	}
}
