var express = require('express');
var router = express.Router();
var databaseConfig = require('../../models/db');
var fs = require('fs');
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  }
});

var upload = multer({ storage: storage });
// const upload = multer({ dest: './upload/' })



 
// Get list product
router.get('/product', function (req, res, next) {
    databaseConfig.query('SELECT * FROM product', function (err, rows) {
        if (err) {
            req.flash('error', err);
            // render to views admin/product/index.ejs
            res.render('admin/products/index', { data: '' });
        } else {
            // render to views/books/index.ejs
            res.render('admin/products/index',
                {
                    data: rows,
                    layout: 'orther'
                });
        }

    })
})
// Get view add Product
router.get('/product/create', function (req, res, next) {
    res.render('admin/products/create',
        {
            layout: 'orther'
        });
})
//add new product
router.post('/product/create',upload.single('image'), function (req, res, next) {
    var img = fs.readFileSync(req.file.path);
 var encode_image = img.toString('base64');
 // Define a JSONobject for the image attributes for saving to database
 
 var finalImg = {
      contentType: req.file.mimetype,
      image:  new Buffer(encode_image, 'base64')
   };
    let name = req.body.name;
//   let image = req.body.image;
    let quanlity = req.body.quanlity;
    let size = req.body.size;
    let price = req.body.price;
    let errors = false;

    if (!errors) {
        var form_data = {
            name: name,
            image: finalImg,
            quanlity: quanlity,
            size: size,
            price: price,
        }
        databaseConfig.query('INSERT INTO product SET ?', form_data, function (err, result) {
            if (err) {
                console.log(form_data.image);
                req.flash('error', err)
                // render to add.ejs
                res.render('admin/products/create', {
                    name: form_data.name,
                    image: form_data.image,
                    quanlity: form_data.quanlity,
                    size: form_data.size,
                    price: form_data.price,
                    layout: 'orther',
                })
            } else {
                req.flash('success', 'Product successfully added');
                res.redirect('/admin/product');
            }
        })
    }
})
// Get view edit 
router.get('/product/edit/(:id)', function (req, res, next) {
    let id = req.params.id;
    databaseConfig.query(`SELECT * FROM product where id =` + id, function (err, rows, fields) {
        if(err) throw err
        if (rows.length <= 0) {
            req.flash('error', 'Product not found with id = ' + id)
            res.redirect('/admin/product')
        }
        else{
            res.render('admin/products/edit',{
                id:rows[0].id,
                name: rows[0].name,
                image: rows[0].image,
                quanlity: rows[0].quanlity,
                size: rows[0].size,
                price: rows[0].price,
                layout:'orther'
            })
        }
    })
})

// Update product
router.post('/product/edit/:id',function(req,res,next){
    let id = req.params.id;
    let name = req.body.name;
    let image = req.body.image;
    let quanlity = req.body.quanlity;
    let size = req.body.size;
    let price = req.body.price;
    let errors = false;
    
    if (!errors) {
        var form_data = {
            name: name,
            image: image,
            quanlity: quanlity,
            size: size,
            price: price,
        }
        databaseConfig.query('UPDATE product SET ? WHERE id = ' + id, form_data, function(err, result) {
            if (err) {
                console.log(form_data);
                req.flash('error', err)
                // render to add.ejs
                res.render('admin/products/edit', {
                    name: form_data.name,
                    image: form_data.image,
                    quanlity: form_data.quanlity,
                    size: form_data.size,
                    price: form_data.price,
                    layout: 'orther',
                })
            } else {
                req.flash('success', 'Update Product successfully added');
                res.redirect('/admin/product');
            }
        })
    }

})

//delete
router.get('/product/delete/(:id)', function (req, res, next) {

    let id = req.params.id;

    databaseConfig.query('DELETE FROM product WHERE id = ' + id, function (err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to books page
            res.redirect('admin/product')
        } else {
            // set flash message
            req.flash('success', 'Book successfully deleted! ID = ' + id)
            // redirect to books page
            res.redirect('/admin/product')
        }
    })
})

module.exports = router