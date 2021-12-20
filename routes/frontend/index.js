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

// render /

router.get('/', function (req, res, next) {
  productModel.all().then(rowsAll => {
    productModel.getByKeyWord("Áo").then(rowsShirt => {
      productModel.getByKeyWord("Giày").then(rowShoes => {
        productModel.getByKeyWord("Quần").then(rowPants => {
          productModel.getByKeyWord("%Trẻ Em").then(rowChild => {
            productModel.getByKeyWord("%Thể Thao").then(rowSport => {
              productModel.getByKeyWord("%Thời Trang").then(rowRecommend => {
                res.render('index',
                {
                  title: 'NodeJS Shopping Cart',
                  // layout:layout,
                  data: rowsAll,
                  dataShirt: rowsShirt,
                  dataPants: rowPants,
                  dataShose: rowShoes,
                  dataChild: rowChild,
                  dataSport: rowSport,
                  dataRecommend1: rowRecommend.slice(0,3),
                  dataRecommend2: rowRecommend.slice(4,7),
                });
              })
            })
          })
        })
      })
    })
  })
});
// PRODUCT VIEW
router.get('/product', function (req, res, next) {
  let search = '%' + (req.query.search || '')

  productModel.getByKeyWord(search).then(rowSearch => {
    res.render('partials/frontend/product',
    {
      title: 'Product',
      data: rowSearch,
      // dataRecommend: rowRecommend,
    });
  })
});

// edit product

router.get('/product/detail/(:id)', function (req, res, next) {
  let id = req.params.id;
  productModel.getById(id).then(rows => {
    productModel.getByKeyWord("%Thời Trang").then(rowRe=> {
      res.render('partials/frontend/product-detail',
      {
        id: rows[0].id,
        name: rows[0].name,
        image: rows[0].image,
        quanlity: rows[0].quanlity,
        size: rows[0].size,
        price: rows[0].price,
        dataRe: rowRe.slice(0,3),
        dataRe2: rowRe.slice(4,7),
      }
    );
    })
  })
});

router.post('/admin/product/edit', function (req, res, next) {
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

router.get('/admin/product/delete/(:id)', function (req, res, next) {
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
      console.log(err)
  })

})

// chưa làm. làm nhớ cmt

router.get('/blog', function (req, res, next) {
  res.render('partials/frontend/blog',
    {
      title: 'Blog',
    }
  );
});

// chưa làm. làm nhớ cmt

router.get('/contact', function (req, res, next) {
  res.render('partials/frontend/contact',
    {
      title: 'Contact',
    }
  );
});

//render view admin,login,register

router.get('/admin', function (req, res, next) {
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

router.get('/admin/login', function (req, res, next) {
  res.render('partials/admin/login',
    {
      title: 'Admin-Login',
      layout: null
    }
  );
});

router.get('/admin/register', function (req, res, next) {
  res.render('partials/admin/register',
    {
      title: 'Admin-Register',
      layout: null
    }
  );
});

// management client by admin

router.get('/admin/client', function (req, res, next) {
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

router.get('/admin/client/edit/(:id)', function (req, res, next) {
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

router.post('/admin/client/edit', function (req, res, next) {
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

router.get('/admin/client/delete/(:id)', function (req, res, next) {
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

router.get('/admin/forgotPass', function (req, res, next) {
  res.render('partials/admin/forgotPass',
    {
      title: 'Admin-ForgotPass',
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
