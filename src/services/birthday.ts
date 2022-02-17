import { text } from "express";

export default class Birthday {
	static handlePayload(payload: string, username: string) {
		let response;
		switch (payload) {
			case "INITIALIZE":
				response = [
					{ text: `Nice! ${username}` },
					{ text: "please enter your birthdate in the format YYYY-MM-DD" }
				];
				break;
		}

		return response;
	}
}
