const commentModel = require("../../models/comment")
const session = require("../../middleware/session")
exports.rate = async (req, res) =>{
        const product_id= req.body.productid;
        const content = req.body.content;
        console.log(product_id, content)
        const passport = req.session.passport
        const user = passport.user
        var entity = {
          product_id: product_id,
          user_Id: user.id,
          content: content,
        }
        try {
            console.log(entity)
            const newcmt = await  commentModel.addcomment(entity);
            res.status(201).json(newcmt);
        } catch (error) {
            res.status(500).json({
                status: 'fail',
                message: error.message
            })
        }
};
exports.getRatings = (req,res) => {
    const productId = req.params.productid;

    commentModel.getByIdProduct(productId).then(ratings =>{
        res.status(200).json(ratings)
    }).catch((error) =>{
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    })

}