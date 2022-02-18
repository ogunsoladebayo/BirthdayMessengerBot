import * as error from "../../middlewares/error";

let res;
describe("error.default", () => {
	beforeEach(() => {
		const statusFunc = function (value) {
			this.status = value;
			return this;
		};

		const jsonFunc = function (value) {
			this.json = value;
			return this;
		};

		// express response object mimick
		res = {
			status: statusFunc,
			json: jsonFunc,
			reset: function () {
				this.status = statusFunc;
				this.json = jsonFunc;
			}
		};
	});
	test("0", () => {
		const result: any = error.default({ message: "Server Error" }, 404, res, true);
		expect(result).toMatchSnapshot();
	});

	test("1", () => {
		const result: any = error.default({ message: "Server Error" }, 404, res, true);
		expect(result).toMatchSnapshot();
	});

	test("2", () => {
		const result: any = error.default({ message: "Server Error" }, 404, res, true);
		expect(result).toMatchSnapshot();
	});

	test("3", () => {
		const result: any = error.default({ message: "Server Error" }, 500, res, true);
		expect(result).toMatchSnapshot();
	});

	test("4", () => {
		const result: any = error.default({ message: "Server Error" }, 200, res, true);
		expect(result).toMatchSnapshot();
	});

	test("5", () => {
		const result: any = error.default({ message: "" }, -Infinity, res, false);
		expect(result).toMatchSnapshot();
	});
});
