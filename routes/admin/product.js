var express = require('express');
var router = express.Router();
var productModel = require("../../models/product")
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

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: tutorials } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, tutorials, totalPages, currentPage };
};

// Get list product
router.get('/product/', function (req, res, next) {
    const page = req.body.page ? req.body.page : 0
    productModel.all().then(rows=>{
       
            // render to views/books/index.ejs
            res.render('admin/products/index',
                {
                    data: rows,
                    layout: 'orther'
                });
        

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
router.post('/product/create', imageUploader, function (req, res, next) {
    let name = req.body.name;
    //   let image = req.body.image;
    let image = (req.file) ? req.file.filename : 'defaut.jpg';
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
            // category_id: 1,
            // admin_id: 1,
            // trademark_id : 1,
            // content: 'test',
        }
        databaseConfig.query('INSERT INTO product SET ?', form_data, function (err, result) {
            if (err) {
                // console.log(form_data.image);
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
        if (err) throw err
        if (rows.length <= 0) {
            req.flash('error', 'Product not found with id = ' + id)
            res.redirect('/admin/product')
        }
        else {
            res.render('admin/products/edit', {
                id: rows[0].id,
                name: rows[0].name,
                image: rows[0].image,
                quanlity: rows[0].quanlity,
                size: rows[0].size,
                price: rows[0].price,
                layout: 'orther'
            })
        }
    })
})

// Update product
router.post('/product/edit/:id', function (req, res, next) {

    let id = req.params.id;
    let name = req.body.name;
    // let image = req.body.image;
    let image = (req.file) ? req.file.filename : 'defaut.jpg';
    // console.log(image)
    let quanlity = req.body.quanlity;
    let size = req.body.size;
    let price = req.body.price;
    let errors = false;

    if (!errors) {
        // if(req.file){
        //     var form_data = {
        //         name: name,
        //         image: req.file.filename,
        //         quanlity: quanlity,
        //         size: size,
        //         price: price,
        //     }
        //     databaseConfig.query('UPDATE product SET ? WHERE id = ' + id, form_data, function(err, result) {
        //         if (err) {
        //             console.log(form_data);
        //             req.flash('error', err)
        //             // render to add.ejs
        //             res.render('admin/products/edit', {
        //                 name: form_data.name,
        //                 image: form_data.image,
        //                 quanlity: form_data.quanlity,
        //                 size: form_data.size,
        //                 price: form_data.price,
        //                 layout: 'orther',
        //             })
        //         } else {
        //             req.flash('success', 'Update Product successfully added');
        //             res.redirect('/admin/product');
        //         }
        //     })
        // }
        var form_data = {
            name: name,
            image: image,
            quanlity: quanlity,
            size: size,
            price: price,
        }
        databaseConfig.query('UPDATE product SET ? WHERE id = ' + id, form_data, function (err, result) {
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