import config from "./config";

import { app } from "./app";

// Port Normalization
function normalizePort(val: string): string | number | false {
	const port = parseInt(val, 10);
	if (!Number.isNaN(port)) {
		return val;
	}

	if (port > 0) {
		return port;
	}

	return false;
}

// Check if all environment variables are set
config.checkEnvVariables();

// create a http server
const server = app.listen(config.port, () => {
	const address = server.address();
	const bind = typeof address === "string" ? `pipe ${address}` : `port: ${address.port}`;
	console.log(`Running in ${process.env.NODE_ENV} mode on ${bind}`);
	console.log(
		`Is this the first time running? Make sure to set the messenger webhook by visiting:
		${config.appUrl}/profile?mode=all&verify_token=${config.verifyToken}`
	);
});
