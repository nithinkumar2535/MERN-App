import mongoose from "mongoose";

mongoose.connect("mongodb+srv://dbuser:dbuserpassword@cluster0.biz6pqe.mongodb.net/Reactapp")
    .then((result)=>{
        console.log("connected server")
    })
    .catch((err)=>{
        console.log(err)
    })

export default mongoose;