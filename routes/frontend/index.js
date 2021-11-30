var express = require('express');
var router = express.Router();
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
  databaseConfig.query('SELECT * FROM product ', function (err, rows) {
    if (err) {
      req.flash('error', err);
      // render to views admin/product/index.ejs
      res.render('/products/', { data: '' });
    } else {
      // render to views/books/index.ejs
      res.render('partials/frontend/product',
        {
          title: 'Product',
          data: rows,
        });
    }

  })
});

router.get('/product/detail/(:id)', function (req, res, next) {
  let id = req.params.id;
  databaseConfig.query(`SELECT * FROM product where id =` + id, function (err, rows, fields) {
    if (err) throw err
    if (rows.length <= 0) {
      req.flash('error', 'Product not found with id = ' + id)
      res.redirect('/product/')
    }
    else {
      res.render('partials/frontend/product-detail',
        {
          id:rows[0].id,
          name: rows[0].name,
          image: rows[0].image,
          quanlity: rows[0].quanlity,
          size: rows[0].size,
          price: rows[0].price,
        }
      );
    }
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



// router.get('/admin', function (req, res, next) {
//   res.render('admin', 
//   { 
//     title: 'Admin',
//     layout:null
//   }
//   );
// });
// router.get('/admin/login', function (req, res, next) {
//   res.render('partials/admin/login', 
//   { 
//     title: 'Admin-Login',
//     layout:null
//   }
//   );
// });
// router.get('/admin/register', function (req, res, next) {
//   res.render('partials/admin/register', 
//   { 
//     title: 'Admin-Register',
//     layout:null
//   }
//   );
// });
// router.get('/forgotPassword', function (req, res, next) {
//   res.render('partials/admin/forgotPass', 
//   { 
//     title: 'Admin-ForgotPass',
//     layout:null
//   }
//   );
// });





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
