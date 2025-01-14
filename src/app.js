import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

import productsRouter from "./routes/api/products.routers.js";
import cartsRouter from "./routes/api/carts.routers.js";
import viewsRouter from "./routes/views.routers.js";

import initSockets from "./managers/socketsManager.js";

const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine("handlebars", handlebars.engine());
app.set("views", "src/views");
app.set("view engine", "handlebars");

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

const httpServer = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

const io = new Server(httpServer);

initSockets(io);