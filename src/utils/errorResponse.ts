export default class ErrorResponse extends Error {
	public statusCode: any;
	constructor(message: string, statusCode: any) {
		super(message);
		this.statusCode = statusCode;

		Error.captureStackTrace(this, this.constructor);
	}
}
