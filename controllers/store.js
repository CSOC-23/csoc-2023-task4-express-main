var Book = require("../models/book")
var BookCopy = require("../models/bookCopy")

var getAllBooks = async (req, res) => {
    //TODO: access all books from the book model and render book list page
    const books = await Book.find({});
    res.render("book_list", { books: books, title: "Books | Library" });
}

var getBook = async (req, res) => {
    //TODO: access the book with a given id and render book detail page
    const bookId = req.params.id;

    const searchedBook = await Book.findById(bookId).exec();
    res.render("book_list", { searchedBook: searchedBook, title: "Book_by_id | Library" });
}

var getLoanedBooks = async (req, res) => {
    try {
        // TODO: Access the books loaned for this user and render the loaned books page

        const userId = req.user._id;

        const loanedBooks = await BookCopy.find({ borrower: userId, status: false })
            .populate('book')
            .exec();

        res.render("loaned_books", { books: loanedBooks, title: "Loaned Books | Library" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong while fetching loaned books." });
    }
};


var issueBook = (req, res) => {
    // TODO: Extract necessary book details from request
    // return with appropriate status
    // Optionally redirect to page or display on same
}
var issueBook = async (req, res) => {
    try {
        // Get the current logged-in user's ID from req.user
        const userId = req.user._id;
        // Assuming the book ID is provided in the URL parameters (req.params.bookId)
        const bookId = req.params.bookId;
        // Find the book by its ID
        const book = await Book.findById(bookId);

        // Check if the book exists
        if (!book) {
            return res.status(400).json({ error: "Invalid book ID. Book not found." });
        }

        // Check if the book is available (status is true) for issuing
        const availableBookCopy = await BookCopy.findOne({ book: bookId, status: true })

        if (!availableBookCopy) {
            return res.status(400).json({ error: "Book is not available for issuing at the moment." })
        }

        // Mark the book copy as issued (status = false), set borrower and borrow date
        availableBookCopy.status = false
        availableBookCopy.borrower = userId
        availableBookCopy.borrow_date = new Date() // Set the current date as the borrow date
        await availableBookCopy.save()

        return res.json({ success: true, message: "Book issued successfully." })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Somethng went wrong while issuing the book." })
    }
};


var searchBooks = async (req, res) => {
    // TODO: extract search details
    // query book model on these details
    // render page with the above details

    const { title, author, genre } = req.body;
    const searchCriteria = {};

    // Check if the fields are not empty, and if not, add them to the search criteria.
    if (title) searchCriteria.title = title;
    if (author) searchCriteria.author = author;
    if (genre) searchCriteria.genre = genre;

    console.log("search criteria :", searchCriteria)

    const searchedBook = await Book.find(searchCriteria).exec();
    res.render("book_list", { books: searchedBook, title: "Searched_Books | Library" });
}

var returnBook = async (req, res) => {
    try {
      const bookCopyId = req.params.id;
  
      // Find the book copy by its ID
      const bookCopy = await BookCopy.findById(bookCopyId);
  
      // Check if the book copy exists and is borrowed
      if (!bookCopy || bookCopy.status === true || !bookCopy.borrower) {
        return res.status(400).json({ error: "Invalid book copy ID or book is not issued." });
      }
  
      // Mark the book copy as returned and update the borrower and borrow date
      bookCopy.status = true;
      bookCopy.borrower = null;
      bookCopy.borrow_date = null;
      await bookCopy.save();
  
      return res.json({ success: true, message: "Book returned successfully." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Something went wrong while returning the book." });
    }
  };


module.exports = {
    getAllBooks,
    getBook,
    getLoanedBooks,
    issueBook,
    searchBooks,
    returnBook
}
