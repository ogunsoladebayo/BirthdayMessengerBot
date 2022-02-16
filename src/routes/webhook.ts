import express from "express";
import { connectHook } from "../controllers/webhook";

const Router = express.Router();

export const webhookRoutes = Router.get("/", connectHook);
