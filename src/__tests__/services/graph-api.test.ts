import * as graph_api from "../../services/graph-api";
// @ponicode
describe("graph_api.default.callSubscriptionsAPI", () => {
	test("0", async () => {
		await graph_api.default.callSubscriptionsAPI();
	});
});

// @ponicode
describe("graph_api.default.callMessengerProfileAPI", () => {
	test("0", async () => {
		await graph_api.default.callMessengerProfileAPI("POST");
	});

	test("1", async () => {
		await graph_api.default.callMessengerProfileAPI("PUT");
	});

	test("2", async () => {
		await graph_api.default.callMessengerProfileAPI("GET");
	});

	test("3", async () => {
		await graph_api.default.callMessengerProfileAPI("DELETE");
	});

	test("4", async () => {
		await graph_api.default.callMessengerProfileAPI("");
	});
});

// @ponicode
describe("graph_api.default.callSubscribedApps", () => {
	test("0", async () => {
		await graph_api.default.callSubscribedApps();
	});
});

// @ponicode
describe("graph_api.default.callSendApi", () => {
	test("0", async () => {
		await graph_api.default.callSendApi("GET");
	});

	test("1", async () => {
		await graph_api.default.callSendApi("POST");
	});

	test("2", async () => {
		await graph_api.default.callSendApi("PUT");
	});

	test("3", async () => {
		await graph_api.default.callSendApi("DELETE");
	});

	test("4", async () => {
		await graph_api.default.callSendApi("");
	});
});
