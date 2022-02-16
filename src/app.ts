import * as dotenv from "dotenv";
import * as colors from "colors";
import * as express from "express";
import * as morgan from "morgan";
import * as cors from "cors";
import helmet from "helmet";
import errorHandler from "./middlewares/error";
import { webhookRoutes, profileRoutes } from "./routes";

dotenv.config();
colors.enable();

export const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

app.use("/webhook", webhookRoutes);
app.use("/profile", profileRoutes);

app.use(errorHandler);
