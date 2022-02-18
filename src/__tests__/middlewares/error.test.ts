import * as error from "../../middlewares/error";
// @ponicode
describe("error.default", () => {
	test("0", () => {
		const result: any = error.default({ message: "Server Error" }, 404, { status: () => 200 }, true);
		expect(result).toMatchSnapshot();
	});

	test("1", () => {
		const result: any = error.default({ message: "Server Error" }, 404, { status: () => 429 }, true);
		expect(result).toMatchSnapshot();
	});

	test("2", () => {
		const result: any = error.default({ message: "Server Error" }, 404, { status: () => 400 }, true);
		expect(result).toMatchSnapshot();
	});

	test("3", () => {
		const result: any = error.default({ message: "Server Error" }, 500, { status: () => 429 }, true);
		expect(result).toMatchSnapshot();
	});

	test("4", () => {
		const result: any = error.default({ message: "Server Error" }, 200, { status: () => 429 }, true);
		expect(result).toMatchSnapshot();
	});

	test("5", () => {
		const result: any = error.default({ message: "" }, -Infinity, { status: () => -Infinity }, false);
		expect(result).toMatchSnapshot();
	});
});
