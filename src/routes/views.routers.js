import { Router } from "express";

import { getProducts } from "../managers/productsManager.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res) => {

    try {
        const products = await getProducts();
        const title = "Products";
        res.render("home", { products, title });
    } catch (error) {
        res.render("home", { products: [], title });
    }

});

viewsRouter.get("/realtimeproducts", async (req, res) => {

    try {
        const products = await getProducts();
        const title = "Real time products";
        res.render("realTimeProducts", { products, title });

    } catch (error) {
        res.render("realTimeProducts", { products: [], title });
    }

});

export default viewsRouter;