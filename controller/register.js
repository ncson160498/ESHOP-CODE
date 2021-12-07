const express = require("express")
const helper = require("../helpers/Helpers")
const userModel = require("../models/user")
const router = express.Router()

router.get('/is-available-email', (req, res, next) => {
    var user = req.query.email;
    userModel.getUserByEmail(user).then(rows => {
        if (rows.length > 0) {
            return res.json(false);
        }
        return res.json(true);
    })
})
router.post("/", async (req, res, next) => {
    var hash = helper.hash_password(req.body.password)

    var entity = {
        id: helper.generateID(7),
        name: req.body.username,
        password: hash,
        email: req.body.email,
        gender: req.body.gender
    }
    console.log(entity)
    userModel.addNewUser(entity).then(id => {
        res.redirect('/')
    }).catch(err => {
        console.log(err)
    })

})
module.exports = router