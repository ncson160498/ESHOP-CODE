const express = require("express")
const bcrypt = require("bcryptjs")
const helper = require("../../helpers/Helpers")
const userModel = require("../../models/user")
const passport = require("passport")
const user = require("../../models/user")
const router = express.Router()


//Tạo tài khoản admin
router.post("/register", async (req, res, next) => {
    userModel.getUserByEmail( req.body.email).then(rows => {
        if(rows.length > 0){
            res.send({
                Status: 0,
                Message: "Đã tồn tại tài khoản"
            })
        }
        else
        {
            var hash = helper.hash_password(req.body.password)
            var entity = {
                name: req.body.username,
                phone: req.body.phone,
                address: req.body.address,
                password: hash,
                email: req.body.email,
                admin: 1
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

// đăng nhập tài khoản admin

router.post('/login', (req,res,next)=>{
    passport.authenticate('local', function(err, user, info) {
        if (err) {
          return res.json({Status: 2, Message: 'Không tồn tại tài khoản'});
        }
        if (! user) {
          return res.json({Status: 2, Message: 'Không đúng mật khẩu'});
        }
        req.login(user, loginErr => {
          if (loginErr) {
            return res.json({Status: 2, Message: 'Error'});
          }
          if(user.admin === 0){
            return res.json({Status: 0, Message: 'Không phải tài khoản admin'});
          }
          return res.status(200).json({Status: 1, Message: 'success', data: user});
        });      
      })(req, res, next);
}

  );


  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/admin/login');
  });
  

module.exports = router