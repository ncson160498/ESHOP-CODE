

module.exports = (req, res, next) => {

    console.log("auth-admin")
  if (!req.user) {
    
    res.redirect('/login');
  }
  next()
 
  
}
