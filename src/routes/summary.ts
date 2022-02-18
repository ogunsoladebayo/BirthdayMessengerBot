import express from "express";
import { summary } from "../controllers/summary";

const Router = express.Router();

export const summaryRoutes = Router.get("/", summary);
