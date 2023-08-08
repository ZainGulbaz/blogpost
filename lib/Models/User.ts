import mongoose from "mongoose";

let UserSchema= new mongoose.Schema({
    userId:String,
    accessTokens:Number
})


export default mongoose.models.User || mongoose.model('User',UserSchema);