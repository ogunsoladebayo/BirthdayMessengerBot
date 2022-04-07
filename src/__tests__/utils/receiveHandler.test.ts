import ReceiveHandler from "../../utils/receiveHandler";
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

describe("receiveHandler.handlePayload", () => {
	let user: User;
	let receiveHandler: ReceiveHandler;

	beforeEach(() => {
		user = new User("000");
		receiveHandler = new ReceiveHandler(user, {});
	});

	test("0", async () => {
		const result = await receiveHandler.handlePayload("GET_STARTED");
		expect(result).toEqual(expect.arrayContaining([{ text: "Hi!" }, { text: "Please enter your first name" }]));
	});

	test("1", async () => {
		const result = await receiveHandler.handlePayload("START_OVER");
		expect(result).toEqual(expect.arrayContaining([{ text: "Hi!" }, { text: "Please enter your first name" }]));
	});

	test("2", async () => {
		const result = await receiveHandler.handlePayload("invalid");
		expect(result).toEqual(
			expect.arrayContaining([
				{
					text: `Sorry I didn't understand that!`
				}
			])
		);
	});
});
