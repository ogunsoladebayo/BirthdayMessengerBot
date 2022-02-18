import rewire from "rewire";
const server = rewire("../server");
const normalizePort = server.__get__("normalizePort");
// @ponicode
describe("normalizePort", () => {
	test("0", () => {
		const result: any = normalizePort("Dillenberg");
		expect(result).toMatchSnapshot();
	});

	test("1", () => {
		const result: any = normalizePort("Elio");
		expect(result).toMatchSnapshot();
	});

	test("2", () => {
		const result: any = normalizePort("elio@example.com");
		expect(result).toMatchSnapshot();
	});

	test("3", () => {
		const result: any = normalizePort("");
		expect(result).toMatchSnapshot();
	});
});
