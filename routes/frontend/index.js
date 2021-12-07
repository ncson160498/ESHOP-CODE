var express = require('express');
var router = express.Router('');
const bcrypt = require("bcryptjs")
const helper = require("../../helpers/Helpers")
const userModel = require("../../models/user")
const productModel = require("../../models/product")
var databaseConfig = require('../../models/db');

var fs = require('fs');

var Cart = require('../../models/cart');
var products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));

router.get('/', function (req, res, next) {
  res.render('index',
    {
      title: 'NodeJS Shopping Cart',
      // layout:layout,
    }
  );
});
// PRODUCT VIEW
router.get('/product', function (req, res, next) {

  // res.render('partials/frontend/product', 
  // { 
  //   title: 'Product',
  // }
  // );
  productModel.all().then(rows => {

    // render to views/books/index.ejs
    res.render('partials/frontend/product',
      {
        title: 'Product',
        data: rows,
      });

  })
});

router.get('/product/detail/(:id)', function (req, res, next) {
  let id = req.params.id;
  productModel.getById(id).then(rows => {
    res.render('partials/frontend/product-detail',
      {
        id: rows[0].id,
        name: rows[0].name,
        image: rows[0].image,
        quanlity: rows[0].quanlity,
        size: rows[0].size,
        price: rows[0].price,
      }
    );
  })

});
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
    }
  );
});

router.get('/login', function (req, res, next) {
  res.render('partials/frontend/login',
    {
      title: 'Login',
    }
  );
});

router.get('/account', function (req, res, next) {
  res.render('partials/frontend/account',
    {
      title: 'Account',
    }
  );
});


router.get('/blog', function (req, res, next) {
  res.render('partials/frontend/blog',
    {
      title: 'Blog',
    }
  );
});

router.get('/contact', function (req, res, next) {
  res.render('partials/frontend/contact',
    {
      title: 'Contact',
    }
  );
});



router.get('/admin', function (req, res, next) {
  res.render('admin',
    {
      title: 'Admin',
      layout: null
    }
  );
});

router.get('/admin/login', function (req, res, next) {
  res.render('partials/admin/login',
    {
      title: 'Admin-Login',
      layout: null
    }
  );
});

router.post(`/admin/login`, function (req, res, next) {
  const email = req.body.email
  const password = req.body.password
  userModel.getUserByEmail(email).then(rows => {
    if (rows == null) {
      res.send({
        Status: 0,
        Message: "Không tồn tại tài khoản"
      })
    }
    const user = rows[0];
    const ret = bcrypt.compareSync(password, user.password)
    if (ret) {
      res.send({
        Status: 1,
        Message: "Thành công",
        data: user
      })
    }
    else {
      res.send({
        Status: 0,
        Message: "Không đúng mật khẩu"
      })
    }
  })
})

router.get('/admin/register', function (req, res, next) {
  res.render('partials/admin/register',
    {
      title: 'Admin-Register',
      layout: null
    }
  );
});
router.get('/forgotPassword', function (req, res, next) {
  res.render('partials/admin/forgotPass',
    {
      title: 'Admin-ForgotPass',
      layout: null
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
