var express = require('express');
var router = express.Router('');
const userModel = require("../../models/user")
const productModel = require("../../models/product")
const commentModel = require("../../models/comment")
const categoryModel = require("../../models/category")
const trademarkModel = require("../../models/trademark")



var fs = require('fs');

var Cart = require('../../models/cart');
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

  Promise.all([
    productModel.getByKeyWord(search),
    categoryModel.all(),
    trademarkModel.all(),
    productModel.getByCategoryId(category),
    productModel.getByTrademarkId(trademark),
  ]).then(result => {
    var main
    if(category != 0){
      main = result[3]
    }else if(trademark != 0){
      main = result[4]      
    }else{
      main = result[0]
    }

    let page = numberPage(main.length,perPage)
    let arrPage = pageToArry(page)

    res.render('partials/frontend/product',
    {
      title: 'Product',
      data: main,
      dataCategory: result[1],
      dataTrademark: result[2],
      dataCate: result[3],
      dataTrade: result[4],
      numberPage: arrPage,
      // dataRecommend: rowRecommend,
    });
  })

});

// detail product

router.get('/product/detail/(:id)', function (req, res, next) {
  let id = req.params.id;

  Promise.all([
    productModel.getById(id),
    productModel.getByKeyWord("%Thời Trang"),
    productModel.getByKeyWord("%GUCCI"),
    commentModel.getByIdProduct(id),
  ]).then(result => {
    res.render('partials/frontend/product-detail',
    {
      id: result[0][0].id,
      name: result[0][0].name,
      image: result[0][0].image,
      quanlity: result[0][0].quanlity,
      size: result[0][0].size,
      price: result[0][0].price,
      dataRe: result[1].slice(0,3),
      dataRe2: result[2].slice(0,3),
      comment: result[3],
    }
  );
  })
});



router.post('/product/detail/(:id)', function (req, res, next) {
  var id = req.params.id
  var entity = {
    product_id: id,
    name: req.body.textNameInput,
    email: req.body.textEmailInput,
    content: req.body.textContentInput,
  }
  commentModel.addNewComment(entity).then(result => {
    res.redirect('/product/detail/' + id);
  }).catch(err => {
    console.log(err)
})
  
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
