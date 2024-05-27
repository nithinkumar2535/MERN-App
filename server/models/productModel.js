import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    itemName: String,
    itemDesc : String,
    itemCategory:String,
    itemPrice : Number,
    itemWeight:String,
    discountPrice:Number
},{
    timestamps:true
})

const ProductModel = mongoose.model("products", ProductSchema)

export default ProductModel;