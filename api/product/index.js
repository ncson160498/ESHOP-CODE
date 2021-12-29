const {Router} = require('express');

const router = Router();
const apiProductContronler = require("./apiProductContronler.js");

router.post('/rate', apiProductContronler.rate);
router.get('/:productid/rating', apiProductContronler.getRatings)
module.exports = router;