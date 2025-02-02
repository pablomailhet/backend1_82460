import { Router } from "express";

import { getProducts } from "../managers/productsManager.js";

import cartsModel from "../models/carts.model.js";

const viewsRouter = Router();

const categories = [
    { value: "Motores Brushless", title: "Motores Brushless" },
    { value: "ESC", title: "ESC" },
    { value: "Propellers", title: "Propellers" },
    { value: "Flight Controllers", title: "Flight Controllers" }
];

viewsRouter.get("/", async (req, res) => {
    try {
        const cid = "6797eef467633af608f624a4";
        const data = await getProducts(req);
        const title = "Products";
        res.render("home", { data, title, cid, categories });
    } catch (error) {
        res.render("home", { data: [], title: error.message, cid, categories: [] });
    }
});

viewsRouter.get("/realtimeproducts", async (req, res) => {

    try {
        req.query.limit = 100;
        const data = await getProducts(req);
        const title = "Real time products";
        res.render("realTimeProducts", { data, title, categories });
    } catch (error) {
        res.render("realTimeProducts", { data: [], title: error.message, categories: [] });
    }

});

viewsRouter.get("/carts/:cid", async (req, res) => {

    try {

        const { cid } = req.params;

        const cart = await cartsModel.findById(cid);

        if (!cart) {
            throw new Error("Cart not found");
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

        res.render("carts", { title: "Carts", cid, products, total });

    }
    catch (error) {
        res.render("carts", { title: error.message, cid, products: [], total: 0 });
    }

});

export default viewsRouter;