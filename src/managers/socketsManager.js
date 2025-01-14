import { addProduct, deleteProduct } from "./productsManager.js";

const initSockets = (io) => {

    io.on("connection", (socket) => {

        console.log("Un cliente se ha conectado");

        socket.on("addProduct", async (product) => {
            try {
                const newProduct = await addProduct(product);
                io.emit("newProduct", newProduct);

            } catch (error) {
                console.error(error);
                socket.emit("product_error", error.toString());
            }
        });

        socket.on("deleteProduct", async (id) => {
            try {
                await deleteProduct(id);
                io.emit("deletedProduct", id);

            } catch (error) {
                console.error(error);
                socket.emit("product_error", error.toString());
            }
        });

        socket.on("disconnect", () => {
            console.log("Un cliente se ha desconectado");
        });

    });

};

export default initSockets;