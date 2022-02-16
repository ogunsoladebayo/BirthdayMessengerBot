// Imports dependencies
import config from "../config";
import fetch from "node-fetch";
import { URL, URLSearchParams } from "url";

export default class GraphApi {
	static async callSubscriptionsAPI() {
		// Send the HTTP request to the Subscriptions Edge to configure your webhook
		console.log(`Setting app ${config.appId} callback url to ${config.webhookUrl}`);

		const fields = "messages, messaging_postbacks";

		const url = new URL(`${config.apiUrl}/${config.appId}/subscriptions`);
		const searchParams = new URLSearchParams({
			access_token: `${config.appId}|${config.appSecret}`,
			object: "page",
			callback_url: config.webhookUrl,
			verify_token: config.verifyToken,
			fields: fields,
			include_values: "true"
		});
		url.search = searchParams.toString();

		const response = await fetch(url.href, {
			method: "POST",
			headers: { "Content-Type": "application/json" }
		});
		if (response.ok) {
			console.log(`Request sent.`);
		} else {
			console.error(`Unable to callSubscriptionsAPI: ${response.statusText}`, await response.json());
		}
	}

	static async callSubscribedApps() {
		// Send the HTTP request to subscribe an app for Webhooks for Pages
		console.log(`Subscribing app ${config.appId} to page ${config.pageId}`);

		const fields = "messages, messaging_postbacks";

		const url = new URL(`${config.apiUrl}/${config.pageId}/subscribed_apps`);
		const searchParams = new URLSearchParams({
			access_token: config.pageAccesToken,
			subscribed_fields: fields
		});
		url.search = searchParams.toString();

		const response = await fetch(url.href, {
			method: "POST"
		});
		if (response.ok) {
			console.log(`Request sent.`);
		} else {
			console.error(`Unable to callSubscribedApps: ${response.statusText}`, await response.json());
		}
	}
}
