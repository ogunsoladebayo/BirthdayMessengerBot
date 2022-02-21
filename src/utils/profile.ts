// Imports dependencies
import config from "../config";
import GraphApi from "../services/graph-api";

export default class Profile {
	async setWebhook() {
		await GraphApi.callSubscriptionsAPI();
		await GraphApi.callSubscribedApps();
	}

	setThread() {
		const profilePayload = {
			...this.getGetStarted(),
			...this.getGreeting()
		};
	}

	async setGetStarted() {
		const getStartedPayload = this.getGetStarted();
		await GraphApi.callMessengerProfileAPI(getStartedPayload);
	}

	async setGreeting() {
		const greetingPayload = this.getGreeting();
		await GraphApi.callMessengerProfileAPI(greetingPayload);
	}

	async setWhitelistedDomains() {
		const domainPayload = this.getWhitelistedDomains();
		await GraphApi.callMessengerProfileAPI(domainPayload);
	}

	getGetStarted() {
		return {
			get_started: {
				payload: "GET_STARTED"
			}
		};
	}

	getGreeting() {
		const greetings = [
			{
				locale: "en_US",
				text: "Welcome to the birthday messenger bot!"
			}
		];

		return {
			greeting: greetings
		};
	}

	getWhitelistedDomains() {
		const whitelistedDomains = {
			whitelisted_domains: config.whitelistedDomains
		};

		return whitelistedDomains;
	}
}
