var Book = require("../models/book")
const User=require('../models/user')
var BookCopy = require("../models/bookCopy")

var getAllBooks = (req, res) => {
    //TODO: access all books from the book model and render book list page
    Book.find({})
    .then((books) => {
      res.render('book_list', { books: books, title: 'Books | Library' });
    })
    .catch((err) => {
      console.error('Error retrieving books:', err);
      res.status(500).send('Internal Server Error');
    });
}


var getBook = async (req, res) => {
    const bookId = req.params.id;
  
    try {
      const book = await Book.findById(bookId);
  
      if (!book) {
        res.status(404).send('Book not found');
      } else {
        res.render('book_detail', { book: book ,
        title: 'book details'});
      }
    } catch (err) {
      console.error('Error retrieving book:', err);
      res.status(500).send('Internal Server Error');
    }
  };

var getLoanedBooks = (req, res) => {
  return res.render('loaned_books',{ book:updatedBook, title: 'Loaned Books' });
    //TODO: access the books loaned for this user and render loaned books page
    
}

const issueBook = async (req, res) => {
  try {
    // TODO: Extract necessary book details from request
    const bookId = req.body.bid;
    console.log(req.body);
    const userId=req.session.passport.user;
    console.log(userId);


    const book = await Book.findById(bookId).exec();

    if (!book) {
      return res.status(404).send('Book not found.');
    }

    if (book.available_copies === 0) {
      return res.status(400).send('No available copies of this book.');
    }

    book.available_copies--;

    const updatedBook = await book.save();
    console.log('present')

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      console.log('present'),
      console.log(updatedBook._id),
      { $push: { loaned_books: { bookId: updatedBook._id} } },
      { new: true }
    ).exec();
    return res.render('loaned_books',{book:updatedBook, title:'Loaned Books'});
  } catch (err) {
    console.error('Error occurred:', err);
    return res.status(500).send('Internal Server Error');
  }
};


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