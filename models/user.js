var mongoose=require("mongoose");
var	passportLocal=require("passport-local-mongoose");
const book = require("./book");
//DEFINING THE USER MODEL
var userSchema=new mongoose.Schema({
    USERNAME:String,
    PASSWORD:String,

	//TODO: DEFINE USERNAME AND PASSSWORD ATTRIBUTES


    loaned_books:[
        {
            type:mongoose.Schema.Types.ObjectId, 
            ref:"Book"
        }
        //TODO: embed reference to id's of book copies loaned by this particular user in this array
    ]
})
userSchema.plugin(passportLocal);
module.exports=mongoose.model("User",userSchema);