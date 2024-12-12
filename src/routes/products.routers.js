import { Router } from "express";
import fs from "fs";

/*
{
    "title":"Title 01",
    "description":"Description 01",
    "code":"Code 01",
    "price":123.456,
    "status":true,
    "stock":123,
    "category":"Category01"
}
*/

const productsRouter = Router();

const getProducts = async () => {
    try {
        const productsJson = await fs.promises.readFile("src/db/products.json", "utf-8");
        return JSON.parse(productsJson);
    }
    catch (error) {
        return [];
    }
}

const saveProducts = async (products) => {
    try {
        const productsJson = JSON.stringify(products);
        await fs.promises.writeFile("src/db/products.json", productsJson, "utf-8");
        return true;
    }
    catch (error) {
        return false;
    }
}

productsRouter.get("/", async (req, res) => {
    const products = await getProducts();
    const { limit } = req.query;
    const limitValue = parseInt(limit);
    if (limitValue > 0) {
        const filtersProducts = products.slice(0, limitValue);
        return res.send({ status: "success", products: filtersProducts });
    }
    res.send({ status: "success", products });
});

productsRouter.get("/:pid", async (req, res) => {
    const products = await getProducts();
    const pid = parseInt(req.params.pid);
    const product = products.find(prod => prod.id === pid);
    if (!product) {
        return res.status(404).send({ status: "error", message: "Product not found" });
    }
    res.send({ status: "success", product });
});

const verifyProduct = (req, res, next) => {
    const { title, description, code, price, status, stock, category } = req.body;

    if (!title || !description || !code || !price || !status || !stock || !category) {
        return res.status(400).send({ status: "error", message: "Missing required fields." });
    }

    if (typeof title !== "string" ||
        typeof description !== "string" ||
        typeof code !== "string" ||
        typeof price !== "number" ||
        typeof status !== "boolean" ||
        typeof stock !== "number" ||
        typeof category !== "string") {
        return res.status(400).send({ status: "error", message: "Incomplete product or incorrect data types" });
    }

    if (price < 0) {
        return res.status(400).send({ status: "error", message: "Price cannot be negative." });
    }

    if (stock < 0) {
        return res.status(400).send({ status: "error", message: "Stock cannot be negative." });
    }

    next();
}

productsRouter.post("/", verifyProduct, async (req, res) => {
    const products = await getProducts();
    let product = req.body;
    product.id = products.length + 1;
    if (!product.status) {
        product.status = true;
    }
    products.push(product);
    const isOk = await saveProducts(products);
    if (!isOk) {
        return res.status(500).send({ status: "error", message: "Product could not add" });
    }
    res.status(201).send({ status: "success", message: "Product added" });
});

productsRouter.put("/:pid", verifyProduct, async (req, res) => {
    const products = await getProducts();
    const pid = parseInt(req.params.pid);
    const productData = req.body;
    const productIndex = products.findIndex((prod) => {
        return prod.id === pid;
    });
    if (productIndex < 0) {
        return res.status(404).send({ status: "error", message: "Product not found" });
    }
    const product = {
        ...productData,
        id: pid
    }
    products[productIndex] = product;
    const isOk = await saveProducts(products);
    if (!isOk) {
        return res.status(500).send({ status: "error", message: "Product could not updated" });
    }
    res.send({ status: 'success', message: 'Product updated' });
});

productsRouter.delete("/:pid", async (req, res) => {
    const products = await getProducts();
    const pid = parseInt(req.params.pid);
    const productIndex = products.findIndex((prod) => {
        return prod.id === pid;
    });
    if (productIndex < 0) {
        return res.status(404).send({ status: "error", message: "Product not found" });
    }
    const productsUpdated = products.filter(prod => prod.id !== pid);
    const isOk = await saveProducts(productsUpdated);
    if (!isOk) {
        return res.status(500).send({ status: "error", message: "Product could not deleted" });
    }
    res.send({ status: 'success', message: 'Product deleted' });
});

export default productsRouter;