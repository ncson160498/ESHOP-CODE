var express = require('express');
var router = express.Router();
var productModel = require("../../models/product")
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
        res.render('admin/products/create',
        {
            layout: 'orther'
        });
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
    let errors = false;
    if (!errors) {
        var form_data = {
            name: name,
            image: image,
            quanlity: quanlity,
            size: size,
            price: price,
            category_id: 1,
            // admin_id: 1,
            trademark_id: 1,
            // content: 'test',
        }
        productModel.addNewProduct(form_data).then(result => {
            //req.flash('success', 'Product successfully added');
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
    }
})
// Get view edit 
router.get('/product/edit/(:id)', function (req, res, next) {
    if(req.user != null){
        let id = req.params.id;
        productModel.getById(id).then(result => {
            categoryModel.all().then(ressultCategory => {
                trademarkModel.all().then(resultTrademark => {
                    categoryModel.getByid(result[0].category_id).then(cate => {
                        trademarkModel.getByid(result[0].trademark_id).then(trade => {
                            res.render('admin/products/edit', {
                                id: result[0].id,

                                idCate: result[0].category_id,
                                nameCate: cate[0].name,

                                idTrade: result[0].trademark_id,
                                nameTrade: trade[0].name,

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
            })
        })
    }
    else{
        res.redirect('/admin')
    }

})

// Update product
router.post('/product/edit/(:id)', function (req, res, next) {
    let idInput = req.params.id;
    let name = req.body.name;
    // let image = req.body.image;
    //let image = (req.file) ? req.file.filename : 'defaut.jpg';
    // console.log(image)
    let quanlity = req.body.quanlity;
    let size = req.body.size;
    let price = req.body.price;
    let category = req.body.category_id;
    let trademark = req.body.trademark_id;
    let errors = false;
    
    var entity = {
        id: idInput,
        name: name,
        quanlity: quanlity,
        size: size,
        price: price,
        category_id: category,
        trademark_id: trademark,
    }
    
    productModel.update(entity).then(result => {
        console.log()
        res.redirect('/admin/product');
    })

})

//delete
router.get('/product/delete/(:id)', function (req, res, next) {

    if(req.user != null){
        databaseConfig.load('DELETE FROM product WHERE id = ' + id, function (err, result) {
            //if(err) throw err
            console.log(result)
            console.log(err)
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
    
        // productModel.getById(id).then(result => {
        //     var temp = result[0];
        //     console.log(temp)
        //     productModel.deleteProduct(result[0]).then(rows => {
        //         req.flash('success', 'Book successfully deleted! ID = ' + id)
        //         res.redirect('/admin/product');
        //         res.send({
        //             Status: 1,
        //             Message: "Thành công",
        //         })
        //     }).catch(err => {
        //         req.flash('error', err)
        //         // redirect to books page
        //         res.redirect('admin/product')
        //     })
        // })
    }
    else{
        res.redirect('/admin')
    }



    let id = req.params.id;

})

module.exports = router