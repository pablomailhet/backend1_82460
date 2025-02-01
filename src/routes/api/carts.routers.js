import { Router } from "express";

import cartsModel from "../../models/carts.model.js";
import productModel from "../../models/products.model.js";

const cartsRouter = Router();

const verifyProducts = async (req, res, next) => {

    try {
        const { products } = req.body;

        if (!Array.isArray(products)) {
            throw new Error("Invalid products array");
        }
        for (const item of products) {
            if (!item.product || !item.quantity) {
                throw new Error("Each product must have a 'product' and 'quantity' property");
            }
            if (typeof item.quantity !== 'number' || item.quantity <= 0) {
                throw new Error("Quantity must be a positive number");
            }

            if (!await productModel.findById(item.product)) {
                throw new Error(`Product ${item.product} not found`);
            }

        }

        next();

    }
    catch (error) {
        res.status(404).send({ status: "error", message: error.message });
    }

}

cartsRouter.get("/", async (req, res) => {

    try {
        const carts = await cartsModel.find();
        res.send({ status: "success", carts });
    }
    catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }

});

cartsRouter.get("/:cid", async (req, res) => {

    try {
        const { cid } = req.params;

        const cart = await cartsModel.findById(cid);

        if (!cart) {
            return res.status(404).send({ status: "error", message: "Cart not found" });
        }

        res.send({ status: "success", products: cart.products });
    }
    catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }

});

cartsRouter.post("/", verifyProducts, async (req, res) => {

    try {
        let cart = req.body;
        const result = await cartsModel.create(cart);
        res.status(201).send({ status: "success", message: "Cart added", cart: result._id });
    }
    catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }

});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {

    try {
        const { cid, pid } = req.params;

        let quantity = parseInt(req.body.quantity) || 1;
        if (isNaN(quantity) || quantity <= 0) {
            throw new Error("Invalid quantity");
        }

        const cart = await cartsModel.findById(cid);

        if (!cart) {
            return res.status(404).send({ status: "error", message: "Cart not found" });
        }

        if (!await productModel.findById(pid)) {
            return res.status(404).send({ status: "error", message: "Product not found" });
        }

        const products = cart.products;

        const product = products.find(item => item.product.id === pid);

        if (product) {
            product.quantity += quantity;
        }
        else {
            const product = {
                product: pid,
                quantity
            };
            products.push(product);
        }

        await cart.save();

        res.status(201).send({ status: "success", message: "Product added in cart" });

    }
    catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }

});

cartsRouter.put("/:cid", verifyProducts, async (req, res) => {

    try {
        const { cid } = req.params;
        const { products } = req.body;

        const updatedCart = await cartsModel.findByIdAndUpdate(
            cid,
            { $set: { products } },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).send({ status: "error", message: "Cart not found" });
        }

        res.send({ status: "success", message: "Products updated in cart" });

    }
    catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }

});

cartsRouter.put("/:cid/product/:pid", async (req, res) => {

    try {
        const { cid, pid } = req.params;

        const { quantity } = req.body;
        if (isNaN(quantity) || quantity <= 0) {
            throw new Error("Invalid quantity.");
        }

        const cart = await cartsModel.findById(cid);

        if (!cart) {
            return res.status(404).send({ status: "error", message: "Cart not found" });
        }

        const products = cart.products;

        const product = products.find(item => item.product.id === pid);

        if (!product) {
            return res.status(404).send({ status: "error", message: "Product not found" });
        }

        product.quantity = quantity;
        await cart.save();

        res.send({ status: "success", message: "Product updated in cart" });

    }
    catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }

});

cartsRouter.delete("/:cid/product/:pid", async (req, res) => {

    try {

        const { cid, pid } = req.params;

        const updatedCart = await cartsModel.findByIdAndUpdate(
            cid,
            { $pull: { products: { "product": pid } } },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).send({ status: "error", message: "Cart not found" });
        }

        res.send({ status: "success", message: "Product deleted from cart", cart: updatedCart });

    }
    catch (error) {

        res.status(500).send({ status: "error", message: error.message });

    }

});

cartsRouter.delete("/:cid", async (req, res) => {

    try {

        const { cid } = req.params;

        const updatedCart = await cartsModel.findByIdAndUpdate(
            cid,
            { $set: { products: [] } },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).send({ status: "error", message: "Cart not found" });
        }

        res.send({ status: "success", message: "All products deleted from cart", cart: updatedCart });

    }
    catch (error) {

        res.status(500).send({ status: "error", message: error.message });

    }

});

export default cartsRouter;