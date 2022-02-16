// Use dotenv to read .env vars into Node
import "dotenv/config";

// Required environment variables
const ENV_VARS = [
	"PAGE_ID",
	"APP_ID",
	"PAGE_ACCESS_TOKEN",
	"APP_SECRET",
	"VERIFY_TOKEN",
	"APP_URL",
	"MIKRO_ORM_TYPE",
	"MIKRO_ORM_HOST",
	"MIKRO_ORM_PORT",
	"MIKRO_ORM_USER",
	"MIKRO_ORM_PASSWORD",
	"MIKRO_ORM_DB_NAME"
];

export default {
	// Messenger Platform API
	apiDomain: "https://graph.facebook.com",
	apiVersion: "v11.0",

	// Page and Application information
	pageId: process.env.PAGE_ID,
	appId: process.env.APP_ID,
	pageAccesToken: process.env.PAGE_ACCESS_TOKEN,
	appSecret: process.env.APP_SECRET,
	verifyToken: process.env.VERIFY_TOKEN,
	appUrl: process.env.APP_URL,

	// Preferred port (default to 3000)
	port: process.env.PORT || 3000,

	// Base URL for Messenger Platform API calls
	get apiUrl() {
		return `${this.apiDomain}/${this.apiVersion}`;
	},

	// URL of our webhook endpoint
	get webhookUrl() {
		return `${this.appUrl}/webhook`;
	},

	checkEnvVariables: function () {
		ENV_VARS.forEach(function (key) {
			if (!process.env[key]) {
				console.warn("WARNING: Missing the environment variable " + key);
			} else {
				// Check that urls use https
				if (["APP_URL", "SHOP_URL"].includes(key)) {
					const url = process.env[key];
					if (!url.startsWith("https://")) {
						console.warn("WARNING: Your " + key + ' does not begin with "https://"');
					}
				}
			}
		});
	}
};
