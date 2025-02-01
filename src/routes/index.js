import { Router } from "express";

import viewsRouter from "./views.routers.js";
import productsRouter from "./api/products.routers.js";
import cartsRouter from "./api/carts.routers.js";

const indexRouter = Router();

indexRouter.use("/", viewsRouter);
indexRouter.use("/api/products", productsRouter);
indexRouter.use("/api/carts", cartsRouter);

export default indexRouter;