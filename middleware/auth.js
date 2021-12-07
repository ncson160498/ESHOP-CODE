module.exports = {
    forwardAuthenticated: function(req, res, next) {
      if (!req.user) {
        return next();
      }
      else{
        var user = req.user
        console.log(user.name)
        res.redirect('/'); 
      }
    }
  };
  