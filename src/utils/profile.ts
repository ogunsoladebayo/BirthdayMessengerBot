// Imports dependencies
import config from "../config";
import GraphApi from "./graph-api";

export default class Profile {
	setWebhook() {
		GraphApi.callSubscriptionsAPI();
		GraphApi.callSubscribedApps();
	}

	setThread() {
		const profilePayload = {
			...this.getGetStarted(),
			...this.getGreeting()
		};
	}

	setGetStarted() {
		const getStartedPayload = this.getGetStarted();
		GraphApi.callMessengerProfileAPI(getStartedPayload);
	}

	setGreeting() {
		const greetingPayload = this.getGreeting();
		GraphApi.callMessengerProfileAPI(greetingPayload);
	}

	setWhitelistedDomains() {
		const domainPayload = this.getWhitelistedDomains();
		GraphApi.callMessengerProfileAPI(domainPayload);
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
