const express = require('express')
const router  = express.Router()
const {getProducts,updateProduct,searchProduct,seedProducts} = require('../controllers/productController')


router.get('/',getProducts)
router.put('/:id',updateProduct)
router.get('/search', searchProduct);
router.post('/seed', seedProducts);


module.exports = router