var middlewareObj={};


//middleware object to check if logged in
middlewareObj.isLoggedIn = function(req,res,next){
	/*
    TODO: Write function to check if user is logged in.
    If user is logged in: Redirect to next page
    else, redirect to login page
    */
    if (req.isAuthenticated()) {
        // If user is authenticated, proceed to the next middleware function or route handler
        return next();
    } else {
        // If user is not authenticated, redirect to the login page
        res.redirect("/login");
    }
}

module.exports=middlewareObj;