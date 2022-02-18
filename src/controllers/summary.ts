import { Request, Response } from "express";
import { DI } from "../app";
import asyncHandler from "../middlewares/asyncHandler";

/**
 *  @desc       get message summary
 *  @route     GET /messages/:id
 *  @access    Public
 * */
export const summary = asyncHandler(async (req: Request, res: Response, next) => {
	const summary = await DI.userRepository.findAll({ fields: ["user", "name", "messages"] });

	res.status(200).json({
		success: true,
		message: "message summary fetched successfully.",
		data: summary
	});
});
