// Imports dependencies
import GraphApi from "./graph-api";

export default class Profile {
	setWebhook() {
		GraphApi.callSubscriptionsAPI();
		GraphApi.callSubscribedApps();
	}
}
