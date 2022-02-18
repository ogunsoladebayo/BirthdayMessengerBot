import dotenv from "dotenv";
import colors from "colors";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { EntityManager, EntityRepository, MikroORM, RequestContext } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import errorHandler from "./middlewares/error";
import { webhookRoutes, profileRoutes, messagesRoutes, summaryRoutes } from "./routes";
import { Message, User } from "./entities";

dotenv.config();
colors.enable();

export const DI = {} as {
	orm: MikroORM;
	em: EntityManager;
	userRepository: EntityRepository<User>;
	messageRepository: EntityRepository<Message>;
};

export const app = express();

(async () => {
	const orm = await MikroORM.init({
		driver: PostgreSqlDriver,
		driverOptions: {
			connection: {
				ssl: {
					require: true,
					rejectUnauthorized: false
				}
			}
		},
		entities: ["./dist/entities"],
		entitiesTs: ["./src/entities"],
		migrations: {
			path: "./dist/migrations",
			pathTs: "./src/migrations",
			disableForeignKeys: false
		}
	});

	const migrator = orm.getMigrator();
	await migrator.createMigration();
	await migrator.up();

	DI.orm = orm;
	DI.em = DI.orm.em;
	DI.userRepository = DI.orm.em.getRepository(User);
	DI.messageRepository = DI.orm.em.getRepository(Message);
})();

app.use(express.json());
app.use((req, res, next) => RequestContext.create(DI.orm.em, next));
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

// Set template engine in Express
app.set("view engine", "ejs");

app.use("/webhook", webhookRoutes);
app.use("/profile", profileRoutes);
app.use("/messages", messagesRoutes);
app.use("/summary", summaryRoutes);

app.use(errorHandler);
