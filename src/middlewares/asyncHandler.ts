export default function asyncHandler(fn: (arg0: any, arg1: any, arg2: any) => Promise<any>) {
	return (req: any, res: any, next: (reason: any) => PromiseLike<never>) => {
		fn(req, res, next).catch(next);
	};
}
