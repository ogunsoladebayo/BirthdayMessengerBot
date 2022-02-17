import { text } from "express";
import { DI } from "../app";
import { User } from "../entities";

export default class Birthday {
	user: User;

	async setBirthdate(date: string) {
		// eslint-disable-next-line prefer-const
		let [yyyy, mm, dd] = date.split("-").map((p) => parseInt(p));

		mm -= 1;
		const d = new Date(yyyy, mm, dd);

		this.user.birthdate = d;
		await DI.userRepository.persistAndFlush(this.user);
	}

	constructor(user: User) {
		this.user = user;
	}

	handlePayload(payload: string) {
		let response: { text: string }[];
		switch (payload) {
			case "INITIALIZE":
				response = [
					{ text: `Nice! ${this.user.name}` },
					{ text: "please enter your birthdate in the format YYYY-MM-DD" }
				];
				break;

			case "BIRTHDAY":
				response = [{ text: "Cool! Do you want to know how many days to your next birthday?" }];
		}

		return response;
	}

	isValidDate(date: string) {
		if (!/^\d\d\d\d\-\d\d\-\d\d$/.test(date)) return false;

		// eslint-disable-next-line prefer-const
		let [yyyy, mm, dd] = date.split("-").map((p) => parseInt(p));

		mm -= 1;
		const d = new Date(yyyy, mm, dd);
		if (!(d.getFullYear() === yyyy && d.getMonth() === mm && d.getDate() === dd)) return false;

		// check if date is in the past
		const now = new Date();
		return d < now;
	}
}
