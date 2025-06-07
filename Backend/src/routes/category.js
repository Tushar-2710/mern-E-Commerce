// const express = require('express')
// const { addCategory, getCategories } = require('../controller/category')

// const { requireSignin, isAdmin } = require('../middlewares/authMiddleware');


// const router = express.Router()

// router.post('/category/create', addCategory)
// // router.post('/category/create', requireSignin, isAdmin, addCategory);

// router.get('/category/getcategory', getCategories)


// module.exports = router




const express = require('express');
const {addCategory,getCategories,updateCategory,deleteCategory} = require('../controller/category');

const { requireSignin, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// ⛔ Protected: Only admin can create category
router.post('/category/create', requireSignin, isAdmin, addCategory);

// ✅ Public: Anyone can fetch all categories
router.get('/category/getcategory', getCategories);

// ⛔ Protected: Only admin can update category
router.put('/category/updatecategory/:id', requireSignin, isAdmin, updateCategory);

// ⛔ Protected: Only admin can delete category
router.delete('/category/deletecategory/:id', requireSignin, isAdmin, deleteCategory);

module.exports = router;






// const express = require('express')
// const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware')
// const { addCategory, getCategories } = require('../controller/category')

// const router = express.Router()

// router.post('/category/create', requireSignIn, isAdmin, addCategory)
// router.get('/category/getcategory', getCategories)


// module.exports = router







// const express = require('express')
// const {isAdmin,requireSignIn}=require('../middlewares/authMiddleware')
// const { addCategory, getCategories } = require('../controller/category')

// const router = express.Router();

// //routes
// // create category
// router.post("/category/create",requireSignIn,isAdmin,addCategory);

// //get category
// router.get("/category/getcategory", getCategories);

// //update category
// //router.put("/update-category/:id",requireSignIn,isAdmin,updateCategoryController);

// //single category
// // router.get("/single-category/:slug", singleCategoryController);

// //delete category
// //router.delete("/delete-category/:id",requireSignIn,isAdmin,deleteCategoryCOntroller);

// module.exports = router
