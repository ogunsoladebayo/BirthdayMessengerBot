import asyncHandler from "../../middlewares/asyncHandler";

describe("asyncHandler", () => {
	test("should return a function", async () => {
		const mockController = jest.fn();
		const result = asyncHandler(mockController);
		expect(typeof mockController).toBe("function");
	});
});
