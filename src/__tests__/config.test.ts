import config from "../config";

describe("config.getWebHookUrl", () => {
	test("0", () => {
		const result: any = config.webhookUrl;
		expect(result).toMatch(/webhook/);
	});
});
