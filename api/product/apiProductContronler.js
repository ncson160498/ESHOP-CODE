const commentModel = require("../../models/comment")
const session = require("../../middleware/session")
exports.rate = async (req, res) =>{
        const product_id= req.body.productid;
        const content = req.body.content;
        let user_name = req.body.username;
        if(user_name == ""){
            const user = req.session.user;
            console.log(user)
            user_name = user.name;
        }
        var entity = {
          product_id: product_id,
          user_name: user_name,
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
exports.getRatings = async (req,res) => {
    const productId = req.params.productid;
    var page = parseInt(req.query.page) || 1;
    if(!Number.isInteger(page))
        page = 1;
    const perPage = 5;
    const skip = (page - 1)*perPage;
    try {
        const fullRatings = await commentModel.getByIdProduct(productId, -1);
        const ratings = await commentModel.getByIdProduct(productId,perPage,skip);
        if(ratings.length == perPage)
            var pages = Math.ceil(fullRatings.length / ratings.length);
        else
            var pages = page;
        res.status(201).json({
            ratings: ratings,
            curPage: page,
            pages: pages
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }

}