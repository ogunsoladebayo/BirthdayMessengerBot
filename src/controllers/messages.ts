import { Request, Response } from "express";
import { DI } from "../app";
import asyncHandler from "../middlewares/asyncHandler";

/**
 *  @desc       lists all messages received from users
 *  @route     GET /messages
 *  @access    Public
 * */
export const allMessages = asyncHandler(async (req: Request, res: Response, next) => {
	const messages = await DI.messageRepository.findAll({ fields: ["id", "text", "user"] });

	res.status(200).json({
		success: true,
		message: "messages fetched successfully.",
		data: messages
	});
});

/**
 *  @desc       get a message by Id
 *  @route     GET /messages/:id
 *  @access    Public
 * */
export const message = asyncHandler(async (req: Request, res: Response, next) => {
	const messages = await DI.messageRepository.findOneOrFail(
		{ id: parseInt(req.params.id) },
		{ fields: ["id", "text", "user"] }
	);

	res.status(200).json({
		success: true,
		message: `message with id ${req.params.id} fetched successfully.`,
		data: messages
	});
});
