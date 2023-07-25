var mongoose=require("mongoose");
//DEFINING THE BOOK MODEL


var bookSchema=new mongoose.Schema({
    title:String,
    genre:String,
    author:String,
    rating:{
        type:Number,
        max:5,
        min:1
    },
    mrp:Number,
    available_copies:Number
	/*TODO: DEFINE the following attributes-
    title, genre, author, description, rating (out of 5), mrp, available_copies(instances).
     */
})
module.exports=mongoose.model("Book",bookSchema);