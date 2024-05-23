import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    itemName: String,
    itemDesc : String,
    itemPrice : Number,
})

const ProductModel = mongoose.model("products", ProductSchema)

export default ProductModel;