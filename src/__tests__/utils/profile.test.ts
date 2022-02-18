import * as profile from "../../utils/profile";
// @ponicode
describe("profile.default.setThread", () => {
	let inst: any;

	beforeEach(() => {
		inst = new profile.default();
	});

	test("0", () => {
		const result: any = inst.setThread();
		expect(result).toMatchSnapshot();
	});
});

// @ponicode
describe("profile.default.setGetStarted", () => {
	let inst: any;

	beforeEach(() => {
		inst = new profile.default();
	});

	test("0", () => {
		const result: any = inst.setGetStarted();
		expect(result).toMatchSnapshot();
	});
});

// @ponicode
describe("profile.default.setWebhook", () => {
	let inst: any;

	beforeEach(() => {
		inst = new profile.default();
	});

	test("0", () => {
		const result: any = inst.setWebhook();
		expect(result).toMatchSnapshot();
	});
});

// @ponicode
describe("profile.default.setWhitelistedDomains", () => {
	let inst: any;

	beforeEach(() => {
		inst = new profile.default();
	});

	test("0", () => {
		const result: any = inst.setWhitelistedDomains();
		expect(result).toMatchSnapshot();
	});
});

// @ponicode
describe("profile.default.setGreeting", () => {
	let inst: any;

	beforeEach(() => {
		inst = new profile.default();
	});

	test("0", () => {
		const result: any = inst.setGreeting();
		expect(result).toMatchSnapshot();
	});
});

// @ponicode
describe("profile.default.getGetStarted", () => {
	let inst: any;

	beforeEach(() => {
		inst = new profile.default();
	});

	test("0", () => {
		const result: any = inst.getGetStarted();
		expect(result).toMatchSnapshot();
	});
});

// @ponicode
describe("profile.default.getGreeting", () => {
	let inst: any;

	beforeEach(() => {
		inst = new profile.default();
	});

	test("0", () => {
		const result: any = inst.getGreeting();
		expect(result).toMatchSnapshot();
	});
});

// @ponicode
describe("profile.default.getWhitelistedDomains", () => {
	let inst: any;

	beforeEach(() => {
		inst = new profile.default();
	});

	test("0", () => {
		const result: any = inst.getWhitelistedDomains();
		expect(result).toMatchSnapshot();
	});
});