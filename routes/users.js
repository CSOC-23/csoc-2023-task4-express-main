const express = require('express');
const router = express.Router();
const passport=require('passport');


const auth = require('../controllers/auth');


router.get('/login', auth.getLogin);
router.get('/register', auth.getRegister);

router.post('/create',auth.postRegister);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/login'}
), auth.postLogin)

module.exports = router;