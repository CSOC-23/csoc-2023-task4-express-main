var getAllBooks = (req, res) => {
    //TODO: access all books from the book model and render book list page
    res.render("book_list", { books: [], title: "Books | Library" });
}

var getBook = (req, res) => {
    //TODO: access the book with a given id and render book detail page
}

var getLoanedBooks = (req, res) => {

    //TODO: access the books loaned for this user and render loaned books page
}

var issueBook = (req, res) => {
    
    // TODO: Extract necessary book details from request
    let {title,
    genre,
    author,
    description,
    rating,
    mrp,
    available_copies
    }=req.body;
    if (!title||
        !genre||
        !author||
        !description||
        !rating||
        !mrp||
        !available_copies
        
    ) {
        return res.status(400).json({
            success: false,
            message: "All Fields are Mandatory",
        });
    }
}

var searchBooks = (req, res) => {
    // TODO: extract search details
    let {title,
        author,
        genre
        }=req.body;
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