import error from "../../middlewares/error";

let res;
describe("ErrorHandler", () => {
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
	test("should return 500 on server error", () => {
		error(new Error("Server Error"), {}, res, jest.fn());
		expect(res).toHaveProperty("status", 500);
	});

	test("should return false for success on server error", () => {
		error(new Error("Server Error"), {}, res, jest.fn());
		expect(res).toHaveProperty("json", { success: false, message: "Server Error" });
	});

	test("should throw 400 on NotFoundError", () => {
		const err = new Error("NotFoundError");
		err.name = "NotFoundError";
		error(err, {}, res, jest.fn());
		expect(res).toHaveProperty("status", 400);
	});

	test("should return false for success on NotFoundError", () => {
		const errorMessage = "test NotFoundError message";
		const err = new Error(errorMessage);
		err.name = "NotFoundError";
		error(err, {}, res, jest.fn());
		expect(res).toHaveProperty("json", { success: false, message: errorMessage });
	});

	test("should return 400 on InvalidFieldNameException", () => {
		const err = new Error("InvalidFieldNameException");
		err.name = "InvalidFieldNameException";
		error(err, {}, res, jest.fn());
		expect(res).toHaveProperty("status", 400);
	});
	test("should return false for success on InvalidFieldNameException", () => {
		const err = new Error();
		err.name = "InvalidFieldNameException";
		error(err, {}, res, jest.fn());
		expect(res).toHaveProperty("json", {
			success: false,
			message: "One  or more request fields are not provided in the correct format"
		});
	});
});
