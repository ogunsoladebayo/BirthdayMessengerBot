import * as express from "express";
import { connectHook, handleEvent } from "../controllers/webhook";

const Router = express.Router();

export const webhookRoutes = Router.get("/", connectHook).post("/", handleEvent);
