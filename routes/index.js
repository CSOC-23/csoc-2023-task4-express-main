const express = require('express');
const passport=require('passport');

const router = express.Router();
const homeController = require('../controllers/home_controller');
const store=require('../controllers/store');

console.log('router loaded');


router.get('/', homeController.home);
router.use('/users', require('./users'));
router.get('/books',store.getAllBooks);
router.get("/books/loaned",passport.checkAuthentication,
 store.getLoanedBooks);
router.get("/book/:id", store.getBook);
router.post("/books/issue",passport.checkAuthentication,store.issueBook);
router.get('/logout', (req, res) => {
    req.logout(); // Clear user's login session
    req.session.destroy(); // Destroy the session
    res.redirect('/'); // Redirect to the home page or any other page after logout
  });



module.exports = router;