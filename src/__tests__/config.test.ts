import * as config from "../config";
// @ponicode
describe("config.default.checkEnvVariables", () => {
	test("0", () => {
		const result: any = config.default.checkEnvVariables();
		expect(result).toMatchSnapshot();
	});
});
