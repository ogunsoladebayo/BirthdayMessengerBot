export default function asyncHandler(fn: (req: any, res: any, next: any) => Promise<any>) {
	return (req: any, res: any, next: (reason: any) => PromiseLike<never>) => {
		fn(req, res, next).catch(next);
	};
}
