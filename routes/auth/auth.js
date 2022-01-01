const express = require("express")
const bcrypt = require("bcryptjs")
const helper = require("../../helpers/Helpers")
const userModel = require("../../models/user")
const passport = require("passport")
const session = require("../../middleware/session")
const { reset } = require("nodemon")
const router = express.Router()


//Tạo tài khoản khách hàng
router.post("/register", async (req, res, next) => {
    userModel.getUserByEmail(req.body.email).then(rows => {
        if(rows.length > 0){
            res.send({
                Status: 0,
                Message: "Đã tồn tại tài khoản"
            })
        }
        else{
            var hash = helper.hash_password(req.body.password)
            var entity = {
                name: req.body.username,
                phone: req.body.phone,
                address: req.body.address,
                password: hash,
                email: req.body.email
            }
            userModel.addNewUser(entity).then(id => {
                res.send({
                    Status: 1,
                    Message: "Thành công",
                })
            }).catch(err => {
                console.log(err)
            })
        }
    })

})


//Đăng nhập cho khách hàng
router.post('/login', (req,res,next)=>{
    passport.authenticate('local', function(err, user, info) {
        if (err) {
          console.log(err)
          return res.json({Status: 2, Message: 'Không tồn tại tài khoản'});
        }
        if (! user) {
          return res.json({Status: 2, Message: 'Không đúng mật khẩu'});
        }
        req.login(user, loginErr => {
          if (loginErr) {
            return res.json({Status: 2, Message: 'Error'});
          }
          if(user.admin === 1){
            return res.json({Status: 0, Message: 'Không phải tài khoản client'});
          }
          req.session.user = user;
          return res.status(200).json({Status: 1, Message: 'success', data: req.session.user});
        });
      })(req, res, next);
});
  


//Đăng xuất cho khách hàng

router.get('/logout', function(req, res){
  //  req.logout();
  req.session.destroy();
  // req.session.destroy(function(err){
  //   if(err) 
  //     console.log(err);
  //     res.status(200).json({message : 'User Logged Out'});
  // });
  console.log("had logouted")
  res.redirect('/');
});




module.exports = router
