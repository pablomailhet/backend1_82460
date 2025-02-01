import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import indexRouter from "./routes/index.js";
import connectDB from "./config/db.js";
import initSockets from "./managers/socketsManager.js";
import helpers from "./helpers/handlebars-helpers.js";

const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine("handlebars", handlebars.engine({ helpers }));

app.set("views", "src/views");
app.set("view engine", "handlebars");

app.use("/", indexRouter);

connectDB();

const httpServer = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

const io = new Server(httpServer);

initSockets(io);