import express from "express";
import { allMessages, message } from "../controllers/messages";

const Router = express.Router();

export const messagesRoutes = Router.get("/", allMessages).get("/:id", message);
