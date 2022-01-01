const express = require("express")
const helper = require("../../helpers/Helpers")
const userModel = require("../../models/user")
const passport = require("passport")
const { reset } = require("nodemon")
const router = express.Router()

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'sonadweb2022@gmail.com',
      pass: 'abc123_123'
  }
});


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
            var mailOptions = {
              from: 'sonadweb2022@gmail.com',
              to: req.body.email,
              subject: 'Verify Your Email',
              html: `<p>Verify your email address to complete sinup and login into account.</p>
              <p>This Link: <b>expires in 6 hours</b>.</p>
              <p>Press <a href=http://localhost:3001/verify/${req.body.email}>here</a> to process</p>`,
          }
        
          transporter.sendMail(mailOptions, function(error, response){
            if(error){
                console.log(error);
            }else{
                res.redirect('/');
            }
        });

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
                    Message: "Tạo mới tài khoản thành công! Vui Lòng Xác Nhận Tài Khoản Ở Email Của Bạn",
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
          return res.json({Status: 2, Message: 'Không tồn tại tài khoản'});
        }
        if (!user) {
          if(info.message == 'Not Verified Email')
          {
            return res.json({Status: 2, Message: 'Chưa xác nhận email'});
          }
          if(info.message == 'Invalid password'){
            return res.json({Status: 2, Message: 'Không đúng mật khẩu'});
          }
        }
        req.login(user, loginErr => {
          if (loginErr) {
            return res.json({Status: 2, Message: 'Error'});
          }
          if(user.admin === 1){
            return res.json({Status: 0, Message: 'Không phải tài khoản client'});
          }
          if(user.locked === 1){
            return res.json({Status: 0, Message: 'Tài khoản đang bị khóa! Vui lòng liên hệ admin để mở!'});
          }
          req.session.user = user;
          return res.status(200).json({Status: 1, Message: 'Đăng nhập thành công!', data: req.session.user});
        });
      })(req, res, next);
});
  


//Đăng xuất cho khách hàng

router.get('/logout', function(req, res){
  req.logout();
  req.session.destroy();
  // req.session.destroy(function(err){
  //   if(err) 
  //     console.log(err);
  //     res.status(200).json({message : 'User Logged Out'});
  // });
  res.redirect('/');
});




module.exports = router
