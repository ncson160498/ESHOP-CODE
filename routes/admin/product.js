var express = require('express');
var router = express.Router();
var productModel = require("../../models/product")
var userModel = require("../../models/user")
var categoryModel = require("../../models/category")
var trademarkModel = require("../../models/trademark")
var databaseConfig = require('../../models/db');
var fs = require('fs');
const multer = require('multer')

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
      res.render('partials/frontend/admin',
      {
        title: 'Admin',
        layout: null
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
  
  //edit infor client by admin
  
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
    }
    if(req.user != null){
        userModel.update(entity).then(result => {
          userModel.getUserById(entity.id).then(rows => {
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
  
  // chưa làm. làm nhớ cmt
  
  router.get('/forgotPass', function (req, res, next) {
    res.render('partials/admin/forgotPass',
      {
        title: 'Admin-ForgotPass',
        layout: null
      }
    );
  });


















module.exports = router