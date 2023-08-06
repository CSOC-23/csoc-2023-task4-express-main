var Book = require("../models/book")
var BookCopy = require("../models/bookCopy")

var getAllBooks = (req, res) => {
    //TODO: access all books from the book model and render book list page
    Book.find({})
    .then((books) => {
      // If books are found, render the book list page with the book data
      res.render('book_list', { books: books, title: 'Books | Library' });
    })
    .catch((err) => {
      // Handle the error, e.g., display an error page
      console.error('Error retrieving books:', err);
      res.status(500).send('Internal Server Error');
    });
}


var getBook = async (req, res) => {
    const bookId = req.params.id; // Assuming the book ID is passed as a parameter in the request URL
  
    try {
      // Use the Mongoose model to find the book with the given ID
      const book = await Book.findById(bookId);
  
      if (!book) {
        // If no book is found with the given ID, render a not found page
        res.status(404).send('Book not found');
      } else {
        // If the book is found, render the book detail page with the book data
        res.render('book_detail', { book: book ,
        title: 'book details'});
      }
    } catch (err) {
      // Handle the error, e.g., display an error page
      console.error('Error retrieving book:', err);
      res.status(500).send('Internal Server Error');
    }
  };

var getLoanedBooks = (req, res) => {

    //TODO: access the books loaned for this user and render loaned books page
    
}

var issueBook = (req, res) => {
    
    // TODO: Extract necessary book details from request
    // return with appropriate status
    // Optionally redirect to page or display on same
}

var searchBooks = (req, res) => {
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