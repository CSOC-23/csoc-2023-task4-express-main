var mongoose=require("mongoose");
//DEFINING THE BOOK MODEL
var bookSchema=new mongoose.Schema({
	/*TODO: DEFINE the following attributes-
    title, genre, author, description, rating (out of 5), mrp, available_copies(instances).
     */
    title:{
        type:String,
        required:true,
        trim:true
    },
    genre:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String
    },
    rating: {
		type: Number,
		required: true,
	},
    mrp: {
		type: Number,
	},
    available_copies:{
        type: mongoose.Schema.Types.ObjectId,
		ref: "available_copies",
    }
})
module.exports=mongoose.model("Book",bookSchema);