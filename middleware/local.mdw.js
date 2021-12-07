var orderModel = require('../apps/models/order.model')
var orderDetailModel = require('../apps/models/order.detail.model')
var cache = require('memory-cache')
module.exports = (req, res, next) => {
    console.log("Chay qua");
    
    if(res.locals.currentUser!=null)
    {
        if(cache.get('order')==null)
        {
            var priceOrder,shippingOrder
            orderModel.getOrderNoPaymentByUserId(res.locals.currentUser.id).then(response=>{
                priceOrder = response[0].order_price
                shippingOrder = response[0].shipping_price
                orderDetailModel.getByIdOrder(response[0].id).then((listOrder)=>{
                    var product = []
                    listOrder.map(item => {
                        product.push({
                            id:item.id,
                            price:item.price,
                            amount:item.amount
                        })
                    })
                    cache.put(res.locals.currentUser.id,{
                        products :product,
                        discount:null,
                        price:priceOrder,
                        shippingCost:shippingOrder,
                        totalPrice:0,
                        idUser:null,
                        position:{
                            lat:null,
                            lng:null
                        } 
                    })
                    console.log("cache order",cache.get(res.locals.currentUser.id))
                    next()
                })
            })
        }
        else
        {
            next()
        }
        
    }
    else{
        next()
    }
}