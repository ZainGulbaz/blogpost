import mongoose from "mongoose";

const postSchema= new mongoose.Schema({
    postContent:String,
    title:String,
    metaDescription:String,
    keywords:String,
    topic:String,
    createdDate:String,
    userId:mongoose.Schema.ObjectId
});


export default mongoose.models.Post || mongoose.model('Post',postSchema);