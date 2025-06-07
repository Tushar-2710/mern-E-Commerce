// const express = require("express");
// const { addItemToCart, getCartitem, deleteCartitem } = require("../controller/cart");        28-Apr-25

// const router = express.Router();

// router.post("/cart/addtocart/:id", addItemToCart); //:id
// router.get("/cart/getcart", getCartitem);   //
// router.delete("/cart/deletecart/:pid", deleteCartitem); //

// module.exports = router;





// const express = require('express');
// const { addItemToCart, getCartitem, deleteCartitem } = require('../controller/cart');
// const router = express.Router();

// router.post('/cart/addtocart', addItemToCart); // Removed `:id` as user is identified from `req.user._id`
// router.get('/cart/getcart', getCartitem);
// router.delete('/cart/deletecart/:pid', deleteCartitem);

// module.exports = router;




///     This GPT Version            ///

const express = require("express");
const { addItemToCart, getCartitem, deleteCartitem } = require("../controller/cart");
const { requireSignin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/cart/addtocart/:id", requireSignin, addItemToCart);
router.get("/cart/getcart", requireSignin, getCartitem);
router.delete("/cart/deletecart/:pid", requireSignin, deleteCartitem);

module.exports = router;












// const express = require("express");
// const { addItemToCart, getCartitem, deleteCartitem } = require("../controller/cart");
// //const{ getProductphoto}= require("../controller/product")         ////
// const { requireSignin } = require("../middlewares/authMiddleware"); // Import your custom middleware

// const router = express.Router();

// router.post("/cart/addtocart/:id", requireSignin, addItemToCart);
// //router.post("/cart/addtocart/:id", addItemToCart);

// router.get("/cart/getcart", requireSignin, getCartitem);
// //router.get("/cart/getcart:id", requireSignin, getCartitem);
// //router.get('/cart/getcart/:userId', requireSignin, getCartitem);

// //router.get("/cart/getcart/:id", getCartitem);

// router.delete("/cart/deletecart/:pid", requireSignin, deleteCartitem);

// //router.get('cart/product/:pid', getProductphoto);         ////

// module.exports = router;









// const express = require("express");
// const { addItemToCart, getCartitem, deleteCartitem } = require("../controller/cart");
// const { requireSignin } = require("../middlewares/authMiddleware");

// const router = express.Router();

// // These should NOT have `/cart` prefix
// router.post("/addtocart/:id", requireSignin, addItemToCart);
// router.get("/getcart", requireSignin, getCartitem);
// router.delete("/deletecart/:pid", requireSignin, deleteCartitem);

// module.exports = router;
