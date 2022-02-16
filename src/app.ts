import dotenv from "dotenv";
import colors from "colors";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import errorHandler from "./middlewares/error";
import { webhookRoutes } from "./routes";

dotenv.config();
colors.enable();

export const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

app.use("/webhook", webhookRoutes);

app.use(errorHandler);
