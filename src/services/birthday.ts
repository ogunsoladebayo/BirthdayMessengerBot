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
		await DI?.userRepository?.persistAndFlush(this.user);
	}

	constructor(user: User) {
		this.user = user;
	}

	noResponses = [
		"n",
		"no",
		"no, thanks",
		"no thanks",
		"no, thanks!",
		"nah",
		"nah, thanks",
		"nah, thanks!",
		"nope",
		"nope, thanks",
		"nope, thanks!",
		"nope, no",
		"nope, no thanks",
		"nope, no thanks!"
	];
	yesResponses = [
		"y",
		"yes",
		"yes, thanks",
		"yes thanks",
		"yes, thanks!",
		"yeah",
		"yeah, thanks",
		"yeah, thanks!",
		"yep",
		"yep, thanks",
		"yep, thanks!",
		"yep, yes",
		"yep, yes thanks",
		"yep, yes thanks!",
		"yues",
		"yues, thanks",
		"yues, thanks!",
		"yup",
		"yup, thanks",
		"yup, thanks!",
		"yup, yes",
		"yup, yes thanks",
		"yup, yes thanks!"
	];

	handlePayload(payload: string) {
		let response:
			| { text: string }[]
			| { text: string; quick_replies?: { content_type: string; title: string; payload: string }[] }[];
		switch (payload) {
			case "INITIALIZE":
				response = [
					{ text: `Nice! ${this.user.name}` },
					{ text: "please enter your birthdate in the format YYYY-MM-DD" }
				];
				break;

			case "BIRTHDAY":
				response = [
					{
						text: "Cool! Do you want to know how many days to your next birthday?",
						quick_replies: [
							{ content_type: "text", title: "Yes", payload: "YES" },
							{ content_type: "text", title: "No", payload: "NO" }
						]
					}
				];
				break;
		}

		return response;
	}

	handleBirthdayCountdownResponse(reply) {
		let response;

		if (this.noResponses.includes(reply.toLowerCase())) {
			response = [{ text: "Goodbye 👋" }];
		} else if (this.yesResponses.includes(reply.toLowerCase())) {
			response = this.getDaysToBirthday();
		} else {
			response = [
				{ text: "Sorry, I didn't understand that." },
				{
					text: "Do you want to know how many days to your next birthday?",
					quick_replies: [
						{ content_type: "text", title: "Yes", payload: "YES" },
						{ content_type: "text", title: "No", payload: "NO" }
					]
				}
			];
		}
		return response;
	}
	getDaysToBirthday(): any {
		const today = new Date();
		const userMonth = this.user.birthdate?.getMonth();
		const userDay = this.user.birthdate?.getDate();

		const nextBirthday = new Date(today.getFullYear(), userMonth, userDay);
		if (today.getMonth() == userMonth && today.getDate() >= userDay) {
			nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
		}
		const one_day = 1000 * 60 * 60 * 24;
		const text = `There are ${Math.ceil(
			(nextBirthday.getTime() - today.getTime()) / one_day
		)} days left until your next birthday`;
		const response = [
			{ text },
			{
				text: "Cool! Do you want to know how many days to your next birthday?",
				quick_replies: [
					{ content_type: "text", title: "Yes", payload: "YES" },
					{ content_type: "text", title: "No", payload: "NO" }
				]
			}
		];
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
