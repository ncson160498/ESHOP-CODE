var helper = require('../apps/helpers/query.locals.data')
var moment = require('moment')
var logModel = require('../apps/models/log.model')
module.exports = (req, res, next) => {
  if (req.user) {
   
    res.locals.isAuthenticated = true;
    res.locals.authUser = req.user;
    console.log(res.locals.authUser)
    // Add log to db
    var now = helper.GetTimeNow()
    var enity = {
        id : helper.generateID(5),
        username:res.locals.authUser.name,
        name_action:'login',
        post_date:moment(now,"YYYY-MM-DD hh:mm:ss").format("YYYY-MM-DD hh:mm:ss"),
    }
    logModel.add(enity)
  }
  next();
}