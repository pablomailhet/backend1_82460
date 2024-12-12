import { Router } from "express";
import fs from "fs";

const cartsRouter = Router();

const getCarts = async () => {
    try {
        const cartsJson = await fs.promises.readFile("src/db/carrito.json", "utf-8");
        return JSON.parse(cartsJson);
    }
    catch (error) {
        return [];
    }
}

const saveCarts = async (carts) => {
    try {
        const cartsJson = JSON.stringify(carts);
        await fs.promises.writeFile("src/db/carrito.json", cartsJson, "utf-8");
        return true;
    }
    catch (error) {
        return false;
    }
}

cartsRouter.get("/", async (req, res) => {
    const carts = await getCarts();
    res.send({ status: "success", carts });
});

cartsRouter.get("/:cid", async (req, res) => {
    const carts = await getCarts();
    const cid = parseInt(req.params.cid);
    const cart = carts.find(cart => cart.id === cid);
    if (!cart) {
        return res.status(404).send({ status: "error", message: "Cart not found" });
    }
    res.send({ status: "success", products: cart.products });
});

const verifyCart = (req, res, next) => {

    let cart = req.body;

    if (!cart.products || !Array.isArray(cart.products)) {
        return res.status(400).send({ status: "error", message: "Products is required and must be an array" });
    }

    const invalidProduct = cart.products.find(product => !Number.isInteger(product.id));
    if (invalidProduct) {
        return res.status(400).send({ status: "error", message: "All product ids must be integers" });
    }

    cart.products.forEach(product => {
        if (!product.hasOwnProperty('quantity')) {
            product.quantity = 0;
        }
    });

    next();

}

cartsRouter.post("/", verifyCart, async (req, res) => {
    const carts = await getCarts();
    let cart = req.body;
    cart.id = carts.length + 1;
    carts.push(cart);
    const isOk = await saveCarts(carts);
    if (!isOk) {
        return res.status(500).send({ status: "error", message: "Cart could not add" });
    }
    res.status(201).send({ status: "success", message: "Cart added" });
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    const carts = await getCarts();
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);

    if (!Number.isInteger(cid)) {
        return res.status(400).send({ status: "error", message: "Invalid cart id" });
    }

    if (!Number.isInteger(pid)) {
        return res.status(400).send({ status: "error", message: "Invalid product id" });
    }

    let quantity = parseInt(req.body.quantity) || 1;
    if (isNaN(quantity) || quantity <= 0) {
        return res.status(400).send({ status: "error", message: "Invalid quantity" });
    }

    const cart = carts.find(cart => cart.id === cid);
    if (!cart) {
        return res.status(404).send({ status: "error", message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex((prod) => prod.id === pid);
    if (productIndex < 0) {
        const product = {
            id: pid,
            quantity
        };
        cart.products.push(product);
    }
    else {
        cart.products[productIndex].quantity += quantity;
    }

    const isOk = await saveCarts(carts);
    if (!isOk) {
        return res.status(500).send({ status: "error", message: "Cart could not add" });
    }

    res.send({ status: "success", message: "Product updated in cart" });
});

export default cartsRouter;