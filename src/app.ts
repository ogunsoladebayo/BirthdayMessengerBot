import * as dotenv from "dotenv";
import * as colors from "colors";
import * as express from "express";
import * as morgan from "morgan";
import * as cors from "cors";
import helmet from "helmet";
import { EntityManager, EntityRepository, MikroORM, RequestContext } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import errorHandler from "./middlewares/error";
import { webhookRoutes, profileRoutes } from "./routes";
import { User } from "./entities";

dotenv.config();
colors.enable();

export const DI = {} as {
	orm: MikroORM;
	em: EntityManager;
	userRepository: EntityRepository<User>;
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
})();

app.use(express.json());
app.use((req, res, next) => RequestContext.create(DI.orm.em, next));
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

app.use("/webhook", webhookRoutes);
app.use("/profile", profileRoutes);

app.use(errorHandler);
