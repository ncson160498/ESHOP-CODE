const express = require("express")
const bcrypt = require("bcryptjs")
const helper = require("../../helpers/Helpers")
const userModel = require("../../models/user")
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

//Tạo tài khoản khách hàng
router.post("/register", async (req, res, next) => {
    var hash = helper.hash_password(req.body.password)
    var entity = {
        name: req.body.username,
        password: hash,
        email: req.body.email
    }
    userModel.addNewUser(entity).then(id => {
        res.send({
            Status: 1,
            Message: "Thành công",
        })
    }).catch(err => {
        console.log(err)
    })
})

//Đăng nhập cho khách hàng
router.post("/login", async (req, res, next) => {

    const email = req.body.email
    const password = req.body.password
    await userModel.getUserByEmail(email).then(rows => {
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
});


module.exports = router