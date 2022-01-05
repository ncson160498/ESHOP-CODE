const express = require('express');
const router = express.Router();
const productModel = require("../../models/product")
const userModel = require("../../models/user")
const categoryModel = require("../../models/category")
const trademarkModel = require("../../models/trademark")
const orderproductModel = require("../../models/orderproduct")
const passport = require("passport")
const helper = require("../../helpers/Helpers")
const bcrypt = require("bcryptjs")

var fs = require('fs');
const multer = require('multer')

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'sonadweb2022@gmail.com',
      pass: 'abc123_123'
  }
});

const imageUploader = multer({
    storage: multer.diskStorage({
        filename: (req, file, cb) => {
            let d = new Date()
            cb(null, d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + "-" +
                d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds() + "-" + file.originalname);
        },
        destination: (req, file, cb) => {
            //   cb(null, __dirname + '/upload');
            cb(null, 'public/img/upload');

        }
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg") {
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    },
    limits: {
        fileSize: 10000000,

    }
}).single('image')

// /admin/Product


// Get list product
router.get('/product', function (req, res, next) {
    if(req.user != null){
      productModel.all().then(rows=>{            
        res.render('admin/products/index',
          {
            data: rows,
            layout: 'orther'
          });
      })
    }
    else{
        res.redirect('/admin')
    }

       
})

// Get view add Product
router.get('/product/create', function (req, res, next) {
    if(req.user != null){
        categoryModel.all().then(cate => {
            trademarkModel.all().then(trade => {
                res.render('admin/products/create',
                {
                    dataCate: cate,
                    dataTrade: trade,
                    layout: 'orther',
                });
            })
        })
    }
    else{
        res.redirect('/admin')
    }

})

//add new product
router.post('/product/create', imageUploader, function (req, res, next) {
    let name = req.body.name;
    let image = (req.file) ? req.file.filename : 'defaut.jpg';
    let quanlity = req.body.quanlity;
    let size = req.body.size;
    let price = req.body.price;
    let category = req.body.category;
    let trademark = req.body.trademark;

    var form_data = {
        name: name,
        image: image,
        quanlity: quanlity,
        size: size,
        price: price,
        category_id: category,
        trademark_id: trademark,
    }
    productModel.addNewProduct(form_data).then(result => {
        res.redirect('/admin/product');
        res.send({
            Status: 1,
            Message: "Thành công",
        })
    }).catch(err => {
        req.flash('error', err)
        res.render('admin/products/create', {
            name: form_data.name,
            image: form_data.image,
            quanlity: form_data.quanlity,
            size: form_data.size,
            price: form_data.price,
            layout: 'orther',
        })
    })
})

// Get view edit 
router.get('/product/edit/(:id)', function (req, res, next) {
    if(req.user != null){
        let id = req.params.id;
        productModel.getById(id).then(result => {
            categoryModel.all().then(ressultCategory => {
                trademarkModel.all().then(resultTrademark => {
                    res.render('admin/products/edit', {
                        id: result[0].id,

                        idCate: result[0].category_id,
                        idTrade: result[0].trademark_id,

                        name: result[0].name,
                        image: result[0].image,
                        quanlity: result[0].quanlity,
                        size: result[0].size,
                        price: result[0].price,
                        dataCategory: ressultCategory,
                        dataTrademark: resultTrademark,
                        layout: 'orther',
                    })
                })
            })
        })
    }
    else{
        res.redirect('/admin')
    }

})

// Update product
router.post('/product/edit/(:id)', function (req, res, next) {
    if(req.user != null){
    var entity = {
      id: req.body.id,
      name: req.body.name,
      quanlity: req.body.quanlity,
      size: req.body.size,
      price: req.body.price,
      category_id: req.body.category,
      trademark_id: req.body.trademark,
    }

      productModel.update(entity).then(result => {
        productModel.getById(entity.id).then(rows => {
          res.status(200).json({Status: 1, Message: 'success', data: rows[0]});
        })
      }).catch(err => {
        console.log(err)
    })
  }
  else{
      res.redirect('/admin')
  }

})

// delete product

router.get('/product/delete/(:id)', function (req, res, next) {
    let id = req.params.id;
    if(req.user != null){
        productModel.getById(id).then(result => {
          productModel.deleteProduct(result[0]).then(rows => {
            res.redirect('/admin/product')
          })
        }).catch(err => {
          console.log(err)
      })
    }
    else{
        res.redirect('/admin')
    }
  })
  
// /admin/Client

//render view admin,login,register

router.get('/', function (req, res, next) {
    if(req.user != null){
      res.render('partials/admin/admin',
      {
        title: 'Admin',
        layout: null,
        nameAdmin: req.user.name,
      }
    );
    }
    else
    {
      res.redirect('/admin/login')
    }
  
  });
  
router.get('/login', function (req, res, next) {
  res.render('partials/admin/login',
    {
      title: 'Admin-Login',
      layout: null
    }
  );
});
  
router.get('/register', function (req, res, next) {
  res.render('partials/admin/register',
    {
      title: 'Admin-Register',
      layout: null
    }
  );
});

// login, register, logout

//Tạo tài khoản admin
router.post("/register", async (req, res, next) => {
  userModel.getUserByEmail(req.body.email).then(rows => {
      if(rows.length > 0){
          res.send({
              Status: 0,
              Message: "Đã tồn tại tài khoản"
          })
      }
      else
      {
        var mailOptions = {
          from: 'sonadweb2022@gmail.com',
          to: req.body.email,
          subject: 'Verify Your Email',
          html: `<p>Verify your email address to complete sinup and login into account.</p>
          <p>This Link: <b>expires in 6 hours</b>.</p>
          <p>Press <a href=${req.get('origin')}/admin/verify/${req.body.email}>here</a> to process</p>`,
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
              email: req.body.email,
              admin: 1
          }
          userModel.addNewUser(entity).then(id => {
              res.send({
                  Status: 1,
                  Message: "Thành công! Vui Lòng Xác Nhận Email",
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
        if(user.admin === 0){
          return res.json({Status: 0, Message: 'Không phải tài khoản admin'});
        }
        return res.status(200).json({Status: 1, Message: 'success', data: user});
      });      
    })(req, res, next);
}

);

// logout
router.get('/logout', function(req, res){
  req.logout();
  req.session.destroy();
  res.redirect('/admin/login');
});

// verify account admin

router.get('/verify/(:email)', function (req, res, next) { 
  userModel.getUserByEmail(req.params.email).then(result => {
    var entity = {
      id: result[0].id,
      verify: true,
    }
    userModel.update(entity)
  })
  res.redirect('/admin/login');
});

// account

router.get('/account', function (req, res, next) {
  if(req.user != null){
    userModel.getUserById(req.user.id).then(result => {
      res.render('admin/products/account',
      {
          layout: 'orther',
          id: result[0].id,
          name: result[0].name,
          email: result[0].email,
          phone: result[0].phone,
          address: result[0].address,
          created: result[0].created,
      });
    })
  }
  else{
      res.redirect('/admin')
  }
})

router.post('/account', function (req, res, next) {
  var entity = {
    id: req.body.id,
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
  }

  if(req.user != null){
    userModel.update(entity).then(result => {
      res.status(200).json({Status: 1, Message: 'Successfully'});
    }).catch(err => {
      res.status(500).json({Status: 'fail', Message: 'fail'});
  })
}
else{
    res.redirect('/admin')
}
  
})

// change password admin

router.get('/changepassword', function (req, res, next) {
  if(req.user != null){
    userModel.getUserById(req.user.id).then(result => {
      res.render('admin/products/changepassword',
      {
          layout: 'orther',
          id: result[0].id,
          email: result[0].email,
      });
    })
  }
  else{
      res.redirect('/admin')
  }
})

router.post('/changepassword', function (req, res, next) {
  if(req.user != null){
    userModel.getUserById(req.body.id).then(result => {
      if(result.length < 1){
        return res.status(200).json({Status: 0, Message: 'Không tồn tại tài khoản!'});
      }
      else{
        var acc = result[0]
        var ret = bcrypt.compareSync(req.body.oldpass, acc.password)
        if(ret){
          var hash = helper.hash_password(req.body.newpass)
          var entity = {
            id: req.body.id,
            password: hash,
          }
          userModel.update(entity).then(kq => {
            res.status(200).json({Status: 1, Message: 'Đổi mật khẩu thành công'});
          })
        }else{
          res.status(200).json({Status: 0, Message: 'Mật khẩu cũ không đúng!'});
        }
      }
    })
}
  else{
    res.redirect('/admin')
  }
  
})

  // management client by admin
  
router.get('/client', function (req, res, next) {
  if(req.user != null){
      userModel.allUser().then(result => {
          res.render('admin/client/client',
          {
              layout: 'orther',
              data: result,
          });
      })
  }
  else{
      res.redirect('/admin')
  }
})

//edit information client by admin

router.get('/client/edit/(:id)', function (req, res, next) {
  let id = req.params.id;
  if(req.user != null){
      userModel.getUserById(id).then(result => {
          res.render('admin/client/editclient',
          {
              layout: 'orther',
              data: result[0],
          });
      })
  }
  else{
      res.redirect('/admin')
  }
})

router.post('/client/edit/(:id)', function (req, res, next) {
  var entity = {
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    locked: req.body.locked,
  }
  if(req.user != null){
      userModel.update(entity).then(result => {
        userModel.getUserById(entity.id).then(rows => {
          res.status(200).json({Status: 1, Message: 'Successfully', data: rows[0]});
        })
      }).catch(err => {
        console.log(err)
    })
  }
  else{
      res.redirect('/admin')
  }
})

//delete client by admin

router.get('/client/delete/(:id)', function (req, res, next) {
  let id = req.params.id;
  if(req.user != null){
      userModel.getUserById(id).then(result => {
        userModel.deleteUser(result[0]).then(rows => {
          res.redirect('/admin/client')
        })
      }).catch(err => {
        console.log(err)
    })
  }
  else{
      res.redirect('/admin')
  }
})


// orderproduct

router.get('/order', function (req, res, next) {
  if(req.user != null){
      orderproductModel.all().then(result => {
          res.render('admin/order/order',
          {
              layout: 'orther',
              data: result,
          });
      })
  }
  else{
      res.redirect('/admin')
  }
})

router.get('/order/edit/(:id)', function (req, res, next) {
  let id = req.params.id;
  if(req.user != null){
    orderproductModel.getById(id).then(result => {
          res.render('admin/order/editorder',
          {
              layout: 'orther',
              data: result[0],
          });
      })
  }
  else{
      res.redirect('/admin')
  }
})

router.post('/order/edit/(:id)', function (req, res, next) {
  var entity = {
    id: req.body.id,
    status: req.body.status,
  }
  if(req.user != null){
      orderproductModel.update(entity).then(result => {
        orderproductModel.getById(entity.id).then(rows => {
          res.status(200).json({Status: 1, Message: 'Successfully', data: rows[0]});
        })
      }).catch(err => {
        res.status(200).json({Status: 0, Message: 'Fail!'});
    })
  }
  else{
      res.redirect('/admin')
  }
})

module.exports = router

