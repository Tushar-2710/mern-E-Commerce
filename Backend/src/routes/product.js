const express = require('express')
const { createProduct, getProducts, updateProduct, getSingleProduct, getProductphoto, productDelete, filterProduct, searchProduct } = require('../controller/product')
const multer = require('multer')
const router = express.Router()
const formidable = require('express-formidable')

const { requireSignin, isAdmin } = require('../middlewares/authMiddleware');


router.get('/product/getproducts', getProducts)
router.post('/product/create', formidable(), createProduct)
//router.post('/product/create', requireSignin, isAdmin, formidable(), createProduct);
router.get('/product/getsingleproduct/:slug', getSingleProduct)
router.get('/product/getphoto/:pid', getProductphoto)
// router.get('/product/getphoto/:slug', getProductphoto)
//router.delete('/product/delete/:pid', productDelete)
router.delete('/product/delete/:pid', requireSignin, isAdmin, productDelete);
//router.put('/product/update/:pid', updateProduct)
// router.put('/product/update/:pid', requireSignin, isAdmin, updateProduct);
router.put('/product/update/:pid', requireSignin, isAdmin, formidable(), updateProduct);
router.post('/product/filter', filterProduct)
router.get('/search/:key', searchProduct)

module.exports = router

