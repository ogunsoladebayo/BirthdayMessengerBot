import * as asyncHandler from "../../middlewares/asyncHandler";

describe("asyncHandler.default", () => {
	test("0", async () => {
		const result: any = asyncHandler.default(async () => "return callback value");
		expect(await result).toMatchSnapshot();
	});

	test("1", async () => {
		const result: any = asyncHandler.default(async () => "");
		expect(await result).toMatchSnapshot();
	});
});
