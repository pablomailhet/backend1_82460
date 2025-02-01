import { Schema, model } from "mongoose";

import mongoosePaginate from "mongoose-paginate-v2";

const cartCollection = "carts";

const cartSchema = new Schema({
    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: "products",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
                default: 1
            }
        }]
    }
});

cartSchema.pre("findOne", function () {
    this.populate("products.product");
});

cartSchema.plugin(mongoosePaginate);

const cartsModel = model(cartCollection, cartSchema);

export default cartsModel;