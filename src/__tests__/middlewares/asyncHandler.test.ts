import * as asyncHandler from "../../middlewares/asyncHandler";
// @ponicode
describe("asyncHandler.default", () => {
	test("0", () => {
		const result: any = asyncHandler.default(async () => "return callback value");
		expect(result).toMatchSnapshot();
	});

	test("1", () => {
		const result: any = asyncHandler.default(async () => "");
		expect(result).toMatchSnapshot();
	});
});
