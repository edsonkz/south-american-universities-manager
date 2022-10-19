import express from "express";
import { url, mongo, connectionParams } from "./database/db";
import { router } from "./routes";

const app = express();
app.use(express.json());
app.use(router);
mongo
	.connect(url, connectionParams)
	.then(() => {
		console.log("Connected to database.");
	})
	.catch((err) => {
		console.error(`Error connecting to the database. \n${err}`);
		process.exit(1);
	});

//app.use(router);
process.on("SIGINT", function (params) {
	mongo.disconnect();
	console.log("Finishing application...");
	process.exit(1);
});
export { app };
