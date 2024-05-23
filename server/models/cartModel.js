import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId,ref:"users"},
    products:[{type: mongoose.Schema.Types.ObjectId, ref:"products"}]
})

const cartModel = mongoose.model("cart",cartSchema);

export default cartModel;