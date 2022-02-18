import * as birthday from "../../services/birthday";
import * as User from "../../entities/User";

describe("birthday.default.setBirthdate", () => {
	let inst13: any;
	let inst14: any;
	let inst11: any;
	let inst12: any;
	let inst9: any;
	let inst10: any;
	let inst7: any;
	let inst8: any;
	let inst5: any;
	let inst6: any;
	let inst: any;
	let inst4: any;
	let inst2: any;
	let inst3: any;

	beforeEach(() => {
		inst13 = new User.User("");
		inst14 = new birthday.default(inst13);
		inst11 = new User.User("Maurice Purdy");
		inst12 = new birthday.default(inst11);
		inst9 = new User.User("Becky Bednar");
		inst10 = new birthday.default(inst9);
		inst7 = new User.User("Ronald Keeling");
		inst8 = new birthday.default(inst7);
		inst5 = new User.User("Gail Hoppe");
		inst6 = new birthday.default(inst5);
		inst = new User.User("Ronald Keeling");
		inst4 = new birthday.default(inst);
		inst2 = new User.User("Becky Bednar");
		inst3 = new birthday.default(inst2);
	});

	test("0", async () => {
		await inst3.setBirthdate("01-01-2020-32-01-2020");
	});

	test("1", async () => {
		await inst4.setBirthdate("-01-01-2020");
	});

	test("2", async () => {
		await inst6.setBirthdate("32-01-2020-");
	});

	test("3", async () => {
		await inst8.setBirthdate("--");
	});

	test("4", async () => {
		await inst10.setBirthdate("-");
	});

	test("5", async () => {
		await inst14.setBirthdate("");
	});
});

describe("birthday.default.handleBirthdayCountdownResponse", () => {
	let inst17: any;
	let inst18: any;
	let inst15: any;
	let inst16: any;
	let inst13: any;
	let inst14: any;
	let inst11: any;
	let inst12: any;
	let inst9: any;
	let inst10: any;
	let inst7: any;
	let inst8: any;
	let inst5: any;
	let inst6: any;
	let inst: any;
	let inst4: any;
	let inst2: any;
	let inst3: any;

	beforeEach(() => {
		inst17 = new User.User("");
		inst18 = new birthday.default(inst17);
		inst15 = new User.User("Maurice Purdy");
		inst16 = new birthday.default(inst15);
		inst13 = new User.User("Ronald Keeling");
		inst14 = new birthday.default(inst13);
		inst11 = new User.User("Becky Bednar");
		inst12 = new birthday.default(inst11);
		inst9 = new User.User("Janet Homenick");
		inst10 = new birthday.default(inst9);
		inst7 = new User.User("Gail Hoppe");
		inst8 = new birthday.default(inst7);
		inst5 = new User.User("Ronald Keeling");
		inst6 = new birthday.default(inst5);
		inst = new User.User("Janet Homenick");
		inst4 = new birthday.default(inst);
		inst2 = new User.User("Maurice Purdy");
		inst3 = new birthday.default(inst2);
	});

	test("0", () => {
		const result: any = inst3.handleBirthdayCountdownResponse("https://croplands.org/app/a/reset?token=");
		expect(result).toMatchSnapshot();
	});

	test("1", () => {
		const result: any = inst4.handleBirthdayCountdownResponse("http://www.example.com/route/123?foo=bar");
		expect(result).toMatchSnapshot();
	});

	test("2", () => {
		const result: any = inst6.handleBirthdayCountdownResponse(
			"http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg"
		);
		expect(result).toMatchSnapshot();
	});

	test("3", () => {
		const result: any = inst8.handleBirthdayCountdownResponse("www.google.com");
		expect(result).toMatchSnapshot();
	});

	test("4", () => {
		const result: any = inst10.handleBirthdayCountdownResponse("http://www.croplands.org/account/confirm?t=");
		expect(result).toMatchSnapshot();
	});

	test("5", () => {
		const result: any = inst18.handleBirthdayCountdownResponse("");
		expect(result).toMatchSnapshot();
	});
});

describe("birthday.default.handlePayload", () => {
	let inst7: any;
	let inst8: any;
	let inst5: any;
	let inst6: any;
	let inst: any;
	let inst4: any;
	let inst2: any;
	let inst3: any;

	beforeEach(() => {
		inst7 = new User.User("");
		inst8 = new birthday.default(inst7);
		inst5 = new User.User("Gail Hoppe");
		inst6 = new birthday.default(inst5);
		inst = new User.User("Gail Hoppe");
		inst4 = new birthday.default(inst);
		inst2 = new User.User("Janet Homenick");
		inst3 = new birthday.default(inst2);
	});

	test("0", () => {
		const result: any = inst3.handlePayload("BIRTHDAY");
		expect(result).toMatchSnapshot();
	});

	test("1", () => {
		const result: any = inst4.handlePayload("INITIALIZE");
		expect(result).toMatchSnapshot();
	});

	test("2", () => {
		const result: any = inst6.handlePayload(
			// eslint-disable-next-line max-len
			"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E"
		);
		expect(result).toMatchSnapshot();
	});

	test("3", () => {
		const result: any = inst8.handlePayload("");
		expect(result).toMatchSnapshot();
	});
});

describe("birthday.default.getDaysToBirthday", () => {
	let inst2: any;
	let inst3: any;

	beforeEach(() => {
		inst2 = new User.User("");
		inst3 = new birthday.default(inst2);
	});

	test("0", () => {
		const result: any = inst3.getDaysToBirthday();
		expect(result).toMatchSnapshot();
	});
});

// @ponicode
describe("birthday.default.isValidDate", () => {
	let inst15: any;
	let inst16: any;
	let inst13: any;
	let inst14: any;
	let inst11: any;
	let inst12: any;
	let inst9: any;
	let inst10: any;
	let inst7: any;
	let inst8: any;
	let inst5: any;
	let inst6: any;
	let inst: any;
	let inst4: any;
	let inst2: any;
	let inst3: any;

	beforeEach(() => {
		inst15 = new User.User("");
		inst16 = new birthday.default(inst15);
		inst13 = new User.User("Gail Hoppe");
		inst14 = new birthday.default(inst13);
		inst11 = new User.User("Maurice Purdy");
		inst12 = new birthday.default(inst11);
		inst9 = new User.User("Gail Hoppe");
		inst10 = new birthday.default(inst9);
		inst7 = new User.User("Gail Hoppe");
		inst8 = new birthday.default(inst7);
		inst5 = new User.User("Gail Hoppe");
		inst6 = new birthday.default(inst5);
		inst = new User.User("Becky Bednar");
		inst4 = new birthday.default(inst);
		inst2 = new User.User("Gail Hoppe");
		inst3 = new birthday.default(inst2);
	});

	test("0", () => {
		const result: any = inst3.isValidDate("01-01-2020--32-01-2020");
		expect(result).toMatchSnapshot();
	});

	test("1", () => {
		const result: any = inst4.isValidDate("-01-01-2020");
		expect(result).toMatchSnapshot();
	});

	test("2", () => {
		const result: any = inst6.isValidDate("-");
		expect(result).toMatchSnapshot();
	});

	test("3", () => {
		const result: any = inst8.isValidDate("--");
		expect(result).toMatchSnapshot();
	});

	test("4", () => {
		const result: any = inst10.isValidDate("01-01-2030");
		expect(result).toMatchSnapshot();
	});

	test("5", () => {
		const result: any = inst16.isValidDate("");
		expect(result).toMatchSnapshot();
	});
});
