import * as receiveHandler from "../../utils/receiveHandler";
import * as User from "../../entities/User";

describe("receiveHandler.default.handlePayload", () => {
	let inst5: any;
	let inst6: any;
	let inst: any;
	let inst4: any;
	let inst2: any;
	let inst3: any;

	beforeEach(() => {
		inst5 = new User.User("");
		inst6 = new receiveHandler.default(inst5, -Infinity);
		inst = new User.User("Ronald Keeling");
		inst4 = new receiveHandler.default(inst, 56784);
		inst2 = new User.User("Becky Bednar");
		inst3 = new receiveHandler.default(inst2, "bc23a9d531064583ace8f67dad60f6bb");
	});

	test("0", async () => {
		await inst3.handlePayload("GET_STARTED");
	});

	test("1", async () => {
		await inst4.handlePayload(
			// eslint-disable-next-line max-len
			"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E"
		);
	});

	test("2", async () => {
		await inst6.handlePayload("");
	});
});

describe("receiveHandler.default.handlePostback", () => {
	let inst2: any;
	let inst3: any;

	beforeEach(() => {
		inst2 = new User.User("");
		inst3 = new receiveHandler.default(inst2, "");
	});

	test("0", () => {
		const result: any = inst3.handlePostback();
		expect(result).toMatchSnapshot();
	});
});

describe("receiveHandler.default.handleMessage", () => {
	let inst2: any;
	let inst3: any;

	beforeEach(() => {
		inst2 = new User.User("");
		inst3 = new receiveHandler.default(inst2, NaN);
	});

	test("0", async () => {
		await inst3.handleMessage();
	});
});

describe("receiveHandler.default.handleTextMessage", () => {
	let inst2: any;
	let inst3: any;

	beforeEach(() => {
		inst2 = new User.User("");
		inst3 = new receiveHandler.default(inst2, NaN);
	});

	test("0", async () => {
		await inst3.handleTextMessage();
	});
});

// @ponicode
describe("receiveHandler.default.sendMessage", () => {
	let inst19: any;
	let inst20: any;
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
		inst19 = new User.User("");
		inst20 = new receiveHandler.default(inst19, -Infinity);
		inst17 = new User.User("Maurice Purdy");
		inst18 = new receiveHandler.default(inst17, "bc23a9d531064583ace8f67dad60f6bb");
		inst15 = new User.User("Gail Hoppe");
		inst16 = new receiveHandler.default(inst15, 12);
		inst13 = new User.User("Gail Hoppe");
		inst14 = new receiveHandler.default(inst13, 56784);
		inst11 = new User.User("Maurice Purdy");
		inst12 = new receiveHandler.default(inst11, 987650);
		inst9 = new User.User("Maurice Purdy");
		inst10 = new receiveHandler.default(inst9, 12);
		inst7 = new User.User("Maurice Purdy");
		inst8 = new receiveHandler.default(inst7, 56784);
		inst5 = new User.User("Becky Bednar");
		inst6 = new receiveHandler.default(inst5, 12345);
		inst = new User.User("Janet Homenick");
		inst4 = new receiveHandler.default(inst, 987650);
		inst2 = new User.User("Becky Bednar");
		inst3 = new receiveHandler.default(inst2, "bc23a9d531064583ace8f67dad60f6bb");
	});

	test("0", () => {
		const result: any = inst3.sendMessage({ delay: 1000 }, 5.0);
		expect(result).toMatchSnapshot();
	});

	test("1", () => {
		const result: any = inst4.sendMessage({ delay: 1000000.0 }, 0.0001);
		expect(result).toMatchSnapshot();
	});

	test("2", () => {
		const result: any = inst6.sendMessage({ delay: 2500 }, 0.0001);
		expect(result).toMatchSnapshot();
	});

	test("3", () => {
		const result: any = inst8.sendMessage({ delay: 0 }, 60);
		expect(result).toMatchSnapshot();
	});

	test("4", () => {
		const result: any = inst10.sendMessage({ delay: 0.0005 }, 0.05);
		expect(result).toMatchSnapshot();
	});

	test("5", () => {
		const result: any = inst20.sendMessage({ delay: -Infinity }, -Infinity);
		expect(result).toMatchSnapshot();
	});
});
