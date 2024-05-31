import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema({
    product: {type:mongoose.Schema.Types.ObjectId, ref:"product"},
    quantity: {type:Number,default: 1}
})

const cartSchema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId,ref:"users"},
   products: [cartProductSchema]
},{
    timestamps:true
})

const cartModel = mongoose.model("cart",cartSchema);

export default cartModel;