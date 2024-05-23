import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email : {
        type:String,
        unique:true,
        required:true
    },
    password : String,
    admin: {type: Boolean, default: false}
},{
    timestamps:true
})

const UserModel = mongoose.model("users", UserSchema)

export default UserModel;