var mongoose = require("mongoose")


//DEFINING THE BOOK  COPIES MODEL
var bookCopySchema = new mongoose.Schema({
    //TODO: DEFINE the following attributes-
    //  book:  //embed reference to id of book of which its a copy
    //  status: //TRUE IF AVAILABLE TO BE ISSUED, ELSE FALSE 
    //  borrow_data: //date when book was borrowed
    //  borrower: //embed reference to id of user who has borrowed it 

    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    borrow_date: {
        type: Date,
        default: null
    },
    borrower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    }
})


module.exports = mongoose.model("Bookcopy", bookCopySchema);