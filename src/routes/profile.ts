import express from "express";
import { setup } from "../controllers/profile";

const Router = express.Router();

export const profileRoutes = Router.get("/", setup);
