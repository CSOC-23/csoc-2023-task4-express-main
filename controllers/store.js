const user = require("../models/user");
const book=require("../models/book")
const bookCopy=require("../models/bookCopy")

var getAllBooks = (req, res) => {
    book.find()
    .then((foundbooks)=>{
        res.render("book_list", { books: foundbooks , title:"Book_list" });
        
    })
    .catch((err)=>{
        console.log(err)
    })


    //TODO: access all books from the book model and render book list page
  
}

var getBook = (req, res) => {
    book.findOne({_id:req.body.bid})
    .then((bookfound)=>{
        res.render("book_detail",{
            book:bookfound,
            num_available:bookfound.available_copies


        })
    })
    .catch((err)=>{
        console.log(err);
    })

    //TODO: access the book with a given id and render book detail page
}

var getLoanedBooks = (req, res) => {
    bookCopy.find({borrower:req.user})
    .populate("book")
    .exec(function(err, loanedBooks){
        if(err){
            console.log(err);
        } else{
            res.render("loaned_books",{books:loanedBooks, title:"Borrowed Books"})
        }
    })


    //TODO: access the books loaned for this user and render loaned books page
}

var issueBook = (req, res) => {
   


    
    // TODO: Extract necessary book details from request
    // return with appropriate status
    // Optionally redirect to page or display on same
}

var searchBooks = (req, res) => {

    title=req.body.title;
    genre=req.body.genre;
    author=req.body.author;
    book.find({title:title, genre:genre, author:author})
    .then((foundbooks)=>{
     res.render("book_list", {title:"Book Results",books:foundbooks })
    })
    .catch((err)=>{
        console.log(err);
    })
 

    // TODO: extract search details
    // query book model on these details
    // render page with the above details
}

module.exports = {
    getAllBooks,
    getBook,
    getLoanedBooks,
    issueBook,
    searchBooks
}