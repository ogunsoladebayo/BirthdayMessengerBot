import GraphApi from "../../services/graph-api";
import Profile from "../../utils/profile";

jest.mock("../../services/graph-api");
const getGetStartedMock = jest.spyOn(Profile.prototype, "getGetStarted");
const getGreetingMock = jest.spyOn(Profile.prototype, "getGreeting");
const getWhitelistedDomainsMock = jest.spyOn(Profile.prototype, "getWhitelistedDomains");

describe("profile.setThread", () => {
	let profile: Profile;

	beforeEach(() => {
		profile = new Profile();
	});

	test("should call getGetStarted method", () => {
		profile.setThread();
		expect(getGetStartedMock).toHaveBeenCalled();
	});

	test("should call getGreeting method", () => {
		profile.setThread();
		expect(getGreetingMock).toHaveBeenCalled();
	});
});

describe("profile.setGetStarted", () => {
	let profile: Profile;

	beforeEach(() => {
		profile = new Profile();
	});

	test("should call getGetStarted method", () => {
		profile.setGetStarted();
		expect(getGetStartedMock).toHaveBeenCalled();
	});

	test("should call GraphApi.callMessengerProfileAPI method", () => {
		profile.setGetStarted();
		expect(GraphApi.callMessengerProfileAPI).toHaveBeenCalled();
	});
});

describe("profile.setWebhook", () => {
	let profile: Profile;

	beforeEach(() => {
		profile = new Profile();
	});

	test("should call GraphApi.callSubscriptionsAPI method", () => {
		profile.setWebhook();
		expect(GraphApi.callSubscriptionsAPI).toHaveBeenCalled();
	});

	test("should call GraphApi.callSubscribedApps method", () => {
		profile.setWebhook();
		expect(GraphApi.callSubscribedApps).toHaveBeenCalled();
	});
});

describe("profile.setWhitelistedDomains", () => {
	let profile: Profile;

	beforeEach(() => {
		profile = new Profile();
	});

	test("should call getWhitelistedDomainsMock method", () => {
		profile.setWhitelistedDomains();
		expect(getWhitelistedDomainsMock).toHaveBeenCalled();
	});

	test("should call GraphApi.callMessengerProfileAPI method", () => {
		profile.setWhitelistedDomains();
		expect(GraphApi.callMessengerProfileAPI).toHaveBeenCalled();
	});
});

describe("profile.setGreeting", () => {
	let profile: Profile;

	beforeEach(() => {
		profile = new Profile();
	});

	test("should call getGreetingMock method", () => {
		profile.setGreeting();
		expect(getGreetingMock).toHaveBeenCalled();
	});

	test("should call GraphApi.callMessengerProfileAPI method", () => {
		profile.setGreeting();
		expect(GraphApi.callMessengerProfileAPI).toHaveBeenCalled();
	});
});

describe("profile.getGetStarted", () => {
	let profile: Profile;

	beforeEach(() => {
		profile = new Profile();
	});

	test("should have get_started property", () => {
		const result = profile.getGetStarted();
		expect(result).toHaveProperty("get_started");
	});
});

describe("profile.getGreeting", () => {
	let profile: Profile;

	beforeEach(() => {
		profile = new Profile();
	});

	test("should have greeting property", () => {
		const result = profile.getGreeting();
		expect(result).toHaveProperty("greeting");
	});
	test("greeting object should be an array", () => {
		const result = profile.getGreeting();
		expect(Array.isArray(result.greeting)).toBe(true);
	});
});

describe("profile.getWhitelistedDomains", () => {
	let profile: Profile;

	beforeEach(() => {
		profile = new Profile();
	});

	test("should have whitelisted_domains property", () => {
		const result = profile.getWhitelistedDomains();
		expect(result).toHaveProperty("whitelisted_domains");
	});
});
