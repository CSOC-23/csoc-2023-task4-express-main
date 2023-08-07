const User=require('../models/user');

var getLogin = (req, res) => {
  //TODO: render login page
return res.render('./login',{
    title:'Log In'
});
};

var postLogin = (req, res) => {
  // TODO: authenticate using passport
  //On successful authentication, redirect to next page
  return res.redirect('/');

};

var logout = (req, res) => {
  // TODO: write code to logout user and redirect back to the page
};

var getRegister = (req, res) => {
  // TODO: render register page
return res.render('./register',{
    title: 'Sign Up'
});
};

var postRegister=(req,res)=>{
  if(req.body.password!=req.body.confirm_password){
      return res.render('back');
  }

  User.findOne({email:req.body.email})
  .exec()
  .then(user=>{
      if(!user){
          User.create(req.body)
          .then(newUser=>{
              console.log('user created');
              return res.redirect('/users/login');
          })
          .catch(err=>{
              console.log('error in creating user');
              return;
          })
      }else{
          console.log('back');
          return res.redirect('back');
      }
  })
  .catch(err=>{
      console.log('error in finding user');
      return;
  });

};

module.exports = {
  getLogin,
  postLogin,
  logout,
  getRegister,
  postRegister,
};
