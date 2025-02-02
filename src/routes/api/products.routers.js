import { Router } from "express";

import productModel from "../../models/products.model.js";

const productsRouter = Router();

const buildPaginationResponse = (result, query, sort) => {
    const paginationResponse = {
        status: "success",
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage ? `/?limit=${result.limit}&page=${result.prevPage}&query=${query}&sort=${sort}` : null,
        nextLink: result.hasNextPage ? `/?limit=${result.limit}&page=${result.nextPage}&query=${query}&sort=${sort}` : null,
        limit: result.limit,
        query,
        sort
    }
    return paginationResponse;
};

productsRouter.get("/", async (req, res) => {

    try {

        let { limit, page, query, sort } = req.query;
        limit = limit > 0 ? limit : 10;
        page = page > 0 ? page : 1;
        const queryObject = query ? { category: query } : {};
        let sortObject = {};
        if (sort === "asc" || sort === "desc") {
            sortObject = { price: sort === "asc" ? 1 : -1 };
        }
        const options = { limit, page, sort: sortObject, lean: true };
        const result = await productModel.paginate(queryObject, options);
        res.send(buildPaginationResponse(result, query, sort));

    }
    catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }

});

productsRouter.get("/:pid", async (req, res) => {

    try {
        const { pid } = req.params;

        const product = await productModel.findById(pid);

        if (!product) {
            return res.status(404).send({ status: "error", message: "Product not found" });
        }

        res.send({ status: 'success', product });
    }
    catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }

});

productsRouter.post("/", async (req, res) => {

    try {
        const { body } = req;

        delete body._id;

        const product = await productModel.create(body);
        res.status(201).send({ status: "success", message: "Product added", productId: product._id });
    }
    catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }

});

productsRouter.put("/:pid", async (req, res) => {

    try {
        const { pid } = req.params;
        const { body } = req;

        delete body._id;

        const product = await productModel.findByIdAndUpdate(pid, body, { new: true });

        if (!product) {
            return res.status(404).send({ status: "error", message: "Product not found" });
        }

        res.send({ status: 'success', message: 'Product updated', product });

    }
    catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }

});

productsRouter.delete("/:pid", async (req, res) => {

    try {
        const { pid } = req.params;

        const product = await productModel.findByIdAndDelete(pid);

        if (!product) {
            return res.status(404).send({ status: "error", message: "Product not found" });
        }

        res.send({ status: 'success', message: 'Product deleted' });
    }
    catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }

});

export default productsRouter;