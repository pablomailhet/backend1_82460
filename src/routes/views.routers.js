import { Router } from "express";

import { getProducts } from "../managers/productsManager.js";

import cartsModel from "../models/carts.model.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res) => {
    try {
        const data = await getProducts(req);
        const title = "Products";
        res.render("home", { data, title });
    } catch (error) {
        res.render("home", { data: [], title });
    }
});

viewsRouter.get("/realtimeproducts", async (req, res) => {

    try {
        req.query.limit = 100;
        const data = await getProducts(req);
        const title = "Real time products";
        res.render("realTimeProducts", { data, title });
    } catch (error) {
        res.render("realTimeProducts", { data: [], title });
    }

});

viewsRouter.get("/carts/:cid", async (req, res) => {

    try {

        const { cid } = req.params;

        const cart = await cartsModel.findById(cid);

        if (!cart) {
            return res.status(404).send({ status: "error", message: "Cart not found" });
        }

        const products = cart.products.map(item => {
            const product = item.product;
            return {
                id: product._id,
                title: product.title,
                description: product.description,
                code: product.code,
                price: product.price,
                status: product.status,
                stock: product.stock,
                category: product.category,
                thumbnails: product.thumbnails,
                quantity: item.quantity,
                subtotal: product.price * item.quantity
            };
        });

        const total = products.reduce((acc, product) => acc + product.subtotal, 0);

        res.render("carts", { title: "Carts", products, total });

    }
    catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }

});

export default viewsRouter;