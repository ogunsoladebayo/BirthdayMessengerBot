import Birthday from "../../services/birthday";
import { User } from "../../entities/User";
import { MikroORM, EntityManager, EntityRepository } from "@mikro-orm/core";
import { Message } from "../../entities";

jest.mock("../../app", () => {
	const originalModule = jest.requireActual("../../app");

	return {
		__esModule: true,
		...originalModule,
		DI: {} as {
			orm: MikroORM;
			em: EntityManager;
			userRepository: EntityRepository<User>;
			messageRepository: EntityRepository<Message>;
		}
	};
});

describe("birthday.setBirthdate", () => {
	let user: User;
	let userBirthday: Birthday;

	beforeEach(() => {
		user = new User("000");
		userBirthday = new Birthday(user);
	});

	test("should set user to instance of user on instantiation", () => {
		expect(userBirthday.user).toBeInstanceOf(User);
	});

	test("should set the date on correct format", async () => {
		const spy = jest.spyOn(global, "Date");
		await userBirthday.setBirthdate("2020-01-20");
		const date = spy.mock.instances[0];
		expect(userBirthday.user.birthdate).toBe(date);
	});

	test("should not set the date on incorrect format", async () => {
		const spy = jest.spyOn(global, "Date");
		await userBirthday.setBirthdate("20-2020-01-20");
		const date = spy.mock.instances[0];
		expect(userBirthday.user.birthdate).not.toBe(date);
	});
});
describe("birthday.handlePayload", () => {
	let user: User;
	let userBirthday: Birthday;

	beforeEach(() => {
		user = new User("000");
		user.name = "John";
		userBirthday = new Birthday(user);
	});

	test("should handle invalid argument", () => {
		const result: any = userBirthday.handlePayload("");
		expect(result).toEqual(expect.arrayContaining([{ text: "Sorry, I don't understand this'" }]));
	});

	test("should return correct response for INITIALIZE argument", () => {
		const result: any = userBirthday.handlePayload("INITIALIZE");
		expect(result).toEqual(
			expect.arrayContaining([
				{ text: `Nice! ${userBirthday.user.name}` },
				{ text: "please enter your birthdate in the format YYYY-MM-DD" }
			])
		);
	});

	test("should return correct response for INITIALIZE argument", () => {
		const result: any = userBirthday.handlePayload("BIRTHDAY");
		expect(result).toEqual(
			expect.arrayContaining([
				{
					text: "Cool! Do you want to know how many days to your next birthday?",
					quick_replies: [
						{ content_type: "text", title: "Yes", payload: "YES" },
						{ content_type: "text", title: "No", payload: "NO" }
					]
				}
			])
		);
	});
});

describe("birthday.handleBirthdayCountdownResponse", () => {
	let user: User;
	let userBirthday: Birthday;

	const getDaysToBirthdayMock = jest.spyOn(Birthday.prototype, "getDaysToBirthday").mockImplementation(() => {
		return 1;
	});

	beforeEach(() => {
		user = new User("000");
		user.birthdate = new Date(2000, 1, 1);
		user;
		userBirthday = new Birthday(user);
	});

	test("should handle invalid argument", () => {
		const result: any = userBirthday.handleBirthdayCountdownResponse("");
		expect(result).toEqual(
			expect.arrayContaining([
				{ text: "Sorry, I didn't understand that." },
				{
					text: "Do you want to know how many days to your next birthday?",
					quick_replies: [
						{ content_type: "text", title: "Yes", payload: "YES" },
						{ content_type: "text", title: "No", payload: "NO" }
					]
				}
			])
		);
	});

	test("should return goodbye on NO argument ", () => {
		const result: any = userBirthday.handleBirthdayCountdownResponse("No");
		expect(result).toEqual(expect.arrayContaining([{ text: "Goodbye 👋" }]));
	});

	test("should call the birthday countdown method on yes response", () => {
		const result: any = userBirthday.handleBirthdayCountdownResponse("Yes");
		expect(getDaysToBirthdayMock).toHaveBeenCalled();
	});
	test("should calculate countdown on yes response", () => {
		const result: any = userBirthday.handleBirthdayCountdownResponse("Yes");
		expect(result).toEqual(expect.arrayContaining([{ text: "There are 1 days left until your next birthday" }]));
	});
});

describe("birthday.isValidDate", () => {
	let user: User;
	let userBirthday: Birthday;

	beforeEach(() => {
		userBirthday = new Birthday(user);
	});
	test("0", () => {
		const result: boolean = userBirthday.isValidDate("01-01-2020--32-01-2020");
		expect(result).toBe(false);
	});

	test("1", () => {
		const result: boolean = userBirthday.isValidDate("-01-01-2020");
		expect(result).toBe(false);
	});

	test("2", () => {
		const result: boolean = userBirthday.isValidDate("-");
		expect(result).toBe(false);
	});

	test("3", () => {
		const result: boolean = userBirthday.isValidDate("--");
		expect(result).toBe(false);
	});

	test("4", () => {
		const result: boolean = userBirthday.isValidDate("01-01-2030");
		expect(result).toBe(false);
	});

	test("5", () => {
		const result: boolean = userBirthday.isValidDate("");
		expect(result).toBe(false);
	});

	test("6", () => {
		const result: boolean = userBirthday.isValidDate("200-01-01");
		expect(result).toBe(false);
	});

	test("7", () => {
		const result: boolean = userBirthday.isValidDate("160-04-02");
		expect(result).toBe(false);
	});

	test("8", () => {
		const result: boolean = userBirthday.isValidDate("1960-4-02");
		expect(result).toBe(false);
	});

	test("9", () => {
		const result: boolean = userBirthday.isValidDate("1960-04-2");
		expect(result).toBe(false);
	});

	test("10", () => {
		const result: boolean = userBirthday.isValidDate("1960-4-2");
		expect(result).toBe(false);
	});
});
