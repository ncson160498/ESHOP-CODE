var express = require('express');
var router = express.Router('');
const userModel = require("../../models/user")
const productModel = require("../../models/product")
var bcrypt = require("bcryptjs")
const categoryModel = require("../../models/category")
const trademarkModel = require("../../models/trademark")
const helper = require("../../helpers/Helpers")



var fs = require('fs');

var Cart = require('../../models/cart');
const user = require('../../models/user');
var products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));

const perPage = 6
const stepConst = 3


function numberPage (quanlity,number) {
 if((quanlity%number) == 0)
 {
   return quanlity/number
 }
  return Math.floor(quanlity/number + 1)
};

function pageToArry (number) {
  var result = [];
  for(let i = 1; i <= number; i++){
    var entity = {
      page: i,
    }
    result.push(entity)
  }
  return result
 };

 function pageSearchToArry (number, link) {
  var result = [];
  for(let i = 1; i <= number; i++){
    var entity = {
      page: i,
      link: link,
    }
    result.push(entity)
  }
  return result
 };


const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'sonadweb2022@gmail.com',
      pass: 'abc123_123'
  }
});

var generator = require('generate-password');
// render /

router.get('/', function (req, res, next) {
  let page = parseInt(req.query.page || 1)
  let start = (page - 1)*perPage
  Promise.all( [
    productModel.getLimit(start,perPage),
    productModel.getByKeyWord("Áo"),
    productModel.getByKeyWord("Giày"),
    productModel.getByKeyWord("Quần"),
    productModel.getByKeyWord("%Trẻ Em"),
    productModel.getByKeyWord("%Thể Thao"),
    productModel.getByKeyWord("%Thời Trang"),
    productModel.getQuantily(),
    productModel.getByKeyWord("%GUCCI"),
    categoryModel.all(),
    trademarkModel.all(),
  ]).then(result => {
    
    let page = numberPage(result[7][0].totalCount,perPage)
    let arrPage = pageToArry(page)

    res.render('index',
    {
      title: 'NodeJS Shopping Cart',
      // layout:layout,
      data: result[0],
      dataShirt: result[1].slice(0,4),
      dataPants: result[2].slice(0,4),
      dataShose: result[3].slice(0,4),
      dataChild: result[4].slice(0,4),
      dataSport: result[5].slice(0,4),
      dataRecommend1: result[6].slice(0,3),
      dataRecommend2: result[8].slice(0,3),
      dataCategory: result[9],
      dataTrademark: result[10],
      numberPage: arrPage,
    });
  })


});
// product view and search product
router.get('/product', function (req, res, next) {
  let search = '%' + (req.query.search || '')
  let category = req.query.category || 0
  let trademark = req.query.trademark || 0

  let page = parseInt(req.query.page || 1)
  // let start = (page - 1)*perPage
  let start = (page - 1)*perPage
  let end = (page - 1)*perPage + perPage
  
  Promise.all([
    productModel.getByKeyWord(search),
    categoryModel.all(),
    trademarkModel.all(),
    productModel.getByCategoryId(category),
    productModel.getByTrademarkId(trademark),
  ]).then(result => {
    var main
    var link
    if(category != 0){
      main = result[3]
      link = '?category=' + category
    }else if(trademark != 0){
      main = result[4]
      link = '?trademark=' + trademark
    }else{
      main = result[0]
      link = '?search=' + search
    } 

    let pageAmout = numberPage(main.length,perPage)
    let arrPage = pageSearchToArry(pageAmout,link)

    res.render('partials/frontend/product',
    {
      title: 'Product',
      data: main.slice(start,end),
      dataCategory: result[1],
      dataTrademark: result[2],
      dataCate: result[3],
      dataTrade: result[4],
      numberPage: arrPage,
      link: link,
      // dataRecommend: rowRecommend,
    });
  })

});

// detail product

router.get('/product/detail/(:id)', function (req, res, next) { 
  let id = req.params.id;
  var page = req.query.page;
  if(typeof(page) != "string")
      page = "1"
  Promise.all([
    productModel.getById(id),
    categoryModel.all(),
    trademarkModel.all(),
  ]).then(result => {
    var entity = {
      id: id,
      view: parseInt(result[0][0].view) + 1
    }
    Promise.all([
      productModel.getByCategoryId(result[0][0].category_id),
      productModel.getByTrademarkId(result[0][0].trademark_id),
      productModel.update(entity),
    ]).then(rows => {
      res.render('partials/frontend/product-detail',
      {
        id: result[0][0].id,
        name: result[0][0].name,
        image: result[0][0].image,
        quanlity: result[0][0].quanlity,
        size: result[0][0].size,
        price: result[0][0].price,
        views: result[0][0].view,
        dataCategory: result[1],
        dataTrademark: result[2],

        dataRecommend1: rows[0].slice(0,3),
        dataRecommend2: rows[1].slice(0,3),
        page,
      }
    );
    })
  })
});

// vetify account client
router.get('/verify/(:email)', function (req, res, next) { 
  userModel.getUserByEmail(req.params.email).then(result => {
    var entity = {
      id: result[0].id,
      verify: true,
    }
    userModel.update(entity)
  })
  res.redirect('/login');
});



// chưa làm. nhớ cmt

router.get('/checkout', function (req, res, next) {
  res.render('partials/frontend/checkout',
    {
      title: 'Checkout',
    }
  );
});

router.get('/cart', function (req, res, next) {

  res.render('partials/frontend/cart',
  {
    title: 'Cart',

  });
});

//reden /login

router.get('/login', function (req, res, next) {
  res.render('partials/frontend/login',
    {
      title: 'Login',
    }
  );
});

// account

router.get('/account', function (req, res, next) {
  res.render('partials/frontend/account',
    {
      title: 'Account',
    }
  );
})

// update account client by client

router.post('/account', function (req, res, next) {
  var entity = {
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  }
    userModel.update(entity).then(result => {
      userModel.getUserById(entity.id).then(rows => {
        res.status(200).json({Status: 1, Message: 'success', data: rows});
      })
    }).catch(err => {
      res.status(500).json({Status: 'fail', Message: 'fail'});
  })
})

// change password

router.get('/changepassword', function (req, res, next) {
  res.render('partials/frontend/change-password',
    {
      title: 'changePassword',
    }
  );
})

router.post('/changepassword', function (req, res, next) {
  userModel.getUserById(req.body.id).then(result => {
    var user = result[0]
    var ret = bcrypt.compareSync(req.body.oldpass, user.password)
    if(ret){
      var hash = helper.hash_password(req.body.newpass)
      var entity = {
        id: req.body.id,
        password: hash,
      }
      userModel.update(entity).then(id => {
        userModel.getUserById(req.body.id).then(rows => {
         res.status(200).json({Status: 1, Message: 'Đổi Mật Khẩu Thành Công', data: rows[0]});
        })      
      })
    }else{
      res.status(200).json({Status: 0, Message: 'Mật khẩu cũ không đúng'});
    }
  })
})

//forgot pass client

router.get('/forgotpassword', function (req, res, next) {
  res.render('partials/frontend/forgotPass',
    {
      title: 'forgotPassword',
      layout: null,
    }
  );
})

router.post('/forgotpassword', function (req, res, next) {
  userModel.getUserByEmail(req.body.email).then(result => {
    if(result.length < 1){
      return res.status(200).json({Status: 0, Message: 'Không tồn tại tài khoản'});
    }
    else{
      var user = result[0]
      var mailOptions = {
        from: 'sonadweb2022@gmail.com',
        to: req.body.email,
        subject: 'Forget And Change PassWord',
        html: `<p>Verify your email address to complete reset password account.</p>
        <p>This Link: <b>expires in 6 hours</b>.</p>
        <p>Press <a href=http://localhost:3001/forgotpassword/${req.body.email}>here</a> to reset Password</p>`,
    }

      transporter.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            res.redirect('/');
        }
    });

    return res.status(200).json({Status: 1, Message: 'Vui lòng kiểm tra Email Để Reset Password'});
    }
   
  })
})

router.get('/forgotpassword/(:email)', function (req, res, next) { 
  userModel.getUserByEmail(req.params.email).then(result => {
    if(result.length > 0){
      var password = generator.generate({
        length: 10,
        numbers: true
      });
  
      var hash = helper.hash_password(password)
  
      var entity = {
        id: result[0].id,
        password: hash,
      }
  
      var mailOptions = {
        from: 'sonadweb2022@gmail.com',
        to: req.params.email,
        subject: 'Reset PassWord',
        html: `<p>Reset Password Succesfully. Now, your password become: <a>${password}</a></p>`,
    }
  
      transporter.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            res.redirect('/');
        }
      });
      userModel.update(entity).then(rows => {
        res.redirect('/login');
      })
    }
  })
  
});

// chưa làm. làm nhớ cmt

router.get('/blog', function (req, res, next) {

  Promise.all([
    categoryModel.all(),
    trademarkModel.all(),
  ]).then(result => {
    res.render('partials/frontend/blog',
    {
      title: 'Blog',
      dataCategory: result[0],
      dataTrademark: result[1],
    }
  );
  })
});

router.get('/contact', function (req, res, next) {
  res.render('partials/frontend/contact',
    {
      title: 'Contact',
    }
  );
});

router.get('/add/:id', function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  var product = products.filter(function (item) {
    return item.id == productId;
  });
  cart.add(product[0], productId);
  req.session.cart = cart;
  res.redirect('/');
});

router.get('/cart', function (req, res, next) {
  if (!req.session.cart) {
    return res.render('cart', {
      products: null
    });
  }
  var cart = new Cart(req.session.cart);
  res.render('cart', {
    title: 'NodeJS Shopping Cart',
    products: cart.getItems(),
    totalPrice: cart.totalPrice
  });
});

router.get('/remove/:id', function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.remove(productId);
  req.session.cart = cart;
  res.redirect('/cart');
});

module.exports = router


