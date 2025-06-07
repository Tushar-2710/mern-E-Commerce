// const Cart = require('../models/cart');
// const User = require('../models/auth');
// const Category = require('../models/category');
// const Product = require('../models/product'); // ✅ Fix MissingSchemaError

// // ✅ Add item to cart
// exports.addItemToCart = async (req, resp) => {
//     try {
//         const productId = req.params.id;
//         const userId = req.user._id;

//         // Check if product already exists in the user's cart
//         let existingCartItem = await Cart.findOne({
//             user: userId,
//             product: productId
//         });

//         if (existingCartItem) {
//             existingCartItem.quantity += 1;
//             await existingCartItem.save();
//             return resp.status(200).json({
//                 success: true,
//                 message: "Cart item quantity updated",
//                 cartitem: existingCartItem
//             });
//         } else {
//             const newCartItem = new Cart({
//                 user: userId,
//                 product: productId,
//                 quantity: 1
//             });
//             await newCartItem.save();
//             return resp.status(201).json({
//                 success: true,
//                 message: "Product added to cart",
//                 cartitem: newCartItem
//             });
//         }

//     } catch (error) {
//         console.error(error);
//         resp.status(500).send({
//             success: false,
//             error: error.message,
//             message: "Error in creating cart item"
//         });
//     }
// };

// // ✅ Get all cart items for logged-in user
// exports.getCartitem = async (req, resp) => {
//     try {
//         const userId = req.user._id;

//         const cartItems = await Cart.find({ user: userId }) // ✅ fixed key
//             .populate({
//                 path: 'product',
//                 select: '-photo', // Exclude large image data
//                 populate: {
//                     path: 'category',
//                     model: 'Category'
//                 }
//             });

//         resp.status(200).send({
//             success: true,
//             message: 'Cart items retrieved successfully',
//             cartItems
//         });
//     } catch (error) {
//         console.error(error);
//         resp.status(500).send({
//             success: false,
//             message: 'Error getting cart items',
//             error: error.message
//         });
//     }
// };

// // ✅ Delete a cart item
// exports.deleteCartitem = async (req, resp) => {
//     try {
//         const userId = req.user._id;
//         const cartItemId = req.params.pid;

//         const cartItem = await Cart.findOneAndDelete({
//             _id: cartItemId,
//             user: userId // ✅ fixed key
//         });

//         if (!cartItem) {
//             return resp.status(404).send({
//                 success: false,
//                 message: 'Cart item not found or not belonging to user',
//             });
//         }

//         resp.status(200).send({
//             success: true,
//             message: 'Cart item deleted successfully',
//         });
//     } catch (error) {
//         console.error(error);
//         resp.status(500).send({
//             success: false,
//             message: 'Error deleting cart item',
//             error: error.message,
//         });
//     }
// };



                           ///     chat GPT VErsion           ///         1

const Cart = require('../models/cart');
//const Product = require('../models/product');

// Add item to cart


// exports.addItemToCart = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const productId = req.params.id;

//     // Step 1: Check if the product already exists in the user's cart
//     const existingCartItem = await Cart.findOne({ userId, product: productId });

//     if (existingCartItem) {
//       // If exists, just increment the quantity
//       existingCartItem.quantity += 1;
//       await existingCartItem.save();
//       return res.status(200).json({ message: "Cart item quantity updated" });
//     }

//     // Step 2: Fetch product details from Product model
//     const product = await Product.findById(productId).select("name slug price description category");

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // Step 3: Create new cart item
//     const newCartItem = new Cart({
//       userId,
//       product: productId,
//       name: product.name,
//       slug: product.slug,
//       price: product.price,
//       quantity: 1,
//       description: product.description,
//       category: product.category,
//     });

//     await newCartItem.save();
//     return res.status(201).json({ message: "Product added to cart" });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Error adding to cart", error: error.message });
//   }
// };



exports.addItemToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id;

    // Check if cart item exists for this user and product
    let existingCartItem = await Cart.findOne({ userId, product: productId });

    if (existingCartItem) {
      existingCartItem.quantity += 1;
      await existingCartItem.save();
      return res.status(200).json({ message: "Cart item quantity updated" });
    } else {
      // Create new cart item with product details
      // You might want to fetch product info from Product collection here instead of relying on req.body
      const { name, slug, price, description, quantity, category } = req.body;

      const newCartItem = new Cart({
        userId,
        product: productId,
        name,
        slug,
        price,
        quantity: quantity || 1,
        description,
        category,
      });

      await newCartItem.save();
      return res.status(201).json({ message: "Product added to cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding to cart", error: error.message });
  }
};
                           
                           // Get all cart items for user

                           // Get all cart items for user
exports.getCartitem = async (req, res) => {
  try {
    const userId = req.user._id;

    const cartItems = await Cart.find({ userId })
      .populate({
        path: 'category',
        model: 'Category'
      })
      .populate({
        path: 'product',
        model: 'Product'  // ✅ हेच सगळ्यात महत्वाचं आहे
      });

    res.status(200).json({
      success: true,
      message: 'Cart items retrieved successfully',
      cartItems
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error getting cart items', error: error.message });
  }
};

                          //  exports.getCartitem = async (req, res) => {
                          //    try {
                          //      const userId = req.user._id;
                           
                          //      const cartItems = await Cart.find({ userId })
                          //        .populate({
                          //          path: 'category',
                          //          model: 'Category'
                          //        });
                           
                          //      res.status(200).json({
                          //        success: true,
                          //        message: 'Cart items retrieved successfully',
                          //        cartItems
                          //      });
                          //    } catch (error) {
                          //      console.error(error);
                          //      res.status(500).json({ success: false, message: 'Error getting cart items', error: error.message });
                          //    }
                          //  };
                           
                           // Delete cart item
                           exports.deleteCartitem = async (req, res) => {
                             try {
                               const userId = req.user._id;
                               const cartItemId = req.params.pid;
                           
                               const cartItem = await Cart.findOneAndDelete({ _id: cartItemId, userId });
                           
                               if (!cartItem) {
                                 return res.status(404).json({ success: false, message: 'Cart item not found or unauthorized' });
                               }
                           
                               res.status(200).json({ success: true, message: 'Cart item deleted successfully' });
                             } catch (error) {
                               console.error(error);
                               res.status(500).json({ success: false, message: 'Error deleting cart item', error: error.message });
                             }
                           };
                           


















                //1

// const Cart = require('../models/cart'); // Import the Cart model
// const User = require('../models/auth');  // Import the User model
// const Category = require('../models/category')                  ///

// // Add item to cart
// exports.addItemToCart = async (req, resp) => {
//     try {
//         const {
//             name, slug, price, description, quantity, category
//         } = req.body;
//         const userId = req.user._id;
//         const product = req.params.id;

//         // Check if product already in user's cart
//         // let existingItem = await Cart.findOne({ userId, product });
//         let existingCartItem = await Cart.findOne({
//             user: req.user._id,
//             product: req.params.id, // or whatever field you're passing as product ID
//           });
          

//         // if (existingItem) {
//         //     existingItem.quantity += 1;
//         //     await existingItem.save();
//         //     return resp.status(200).send({
//         //         success: true,
//         //         message: "Cart quantity updated",
//         //         cartitem: existingItem
//         //     });
//         // }
//         if (existingCartItem) {
//             existingCartItem.quantity += 1;
//             await existingCartItem.save();
//             return res.status(200).json({ message: "Cart item updated" });
//           } else {
//             const newCartItem = new Cart({
//               user: req.user._id,
//               product: req.params.id,
//               quantity: 1,
//             });
//             await newCartItem.save();
//             return res.status(201).json({ message: "Product added to cart" });
//           }
          

//         // Else create new cart item
//         // const cartitem = new Cart({
//         //     userId,
//         //     name,
//         //     slug,
//         //     price,
//         //     description,
//         //     quantity: quantity || 1,
//         //     category,
//         //     product
//         // });

//         // await cartitem.save();
//         // resp.status(201).send({
//         //     success: true,
//         //     message: "Product added to cart",
//         //     cartitem
//         // });

//     } catch (error) {
//         console.error(error);
//         resp.status(500).send({
//             success: false,
//             error: error.message,
//             message: "Error in creating cartitem"
//         });
//     }
// };

// // exports.addItemToCart = async (req, resp) => {
// //     try {
// //         const {
// //             name, slug, price, description, quantity, category
// //         } = req.body;
// //         const userId = req.params.id;
// //         const product = req.params.id;                          // ✅ this is required

// //         // Check if product already in user's cart
// //         let existingItem = await Cart.findOne({ userId, slug });

// //         if (existingItem) {
// //             existingItem.quantity += 1;
// //             await existingItem.save();
// //             return resp.status(200).send({
// //                 success: true,
// //                 message: "Cart quantity updated",
// //                 cartitem: existingItem
// //             });
// //         }

// //         // Else create new cart item
// //         const cartitem = new Cart({
// //             userId,
// //             name,
// //             slug,
// //             price,
// //             description,
// //             quantity: 1,
// //             category,
// //             product                                 // ✅ assign the product ID
// //         });

// //         await cartitem.save();
// //         resp.status(201).send({
// //             success: true,
// //             message: "Product added to cart",
// //             cartitem
// //         });

// //     } catch (error) {
// //         resp.status(500).send({
// //             success: false,
// //             error: error.message,
// //             message: "Error in creating cartitem"
// //         });
// //     }
// // };

// // exports.addItemToCart = async (req, resp) => {
// //     try {
// //         const userId = req.user._id;
// //         const productId = req.params.id; // product ID from URL

// //         const { quantity } = req.body;

// //         // Check if item already exists
// //         const existingItem = await Cart.findOne({ userId, product: productId });

// //         if (existingItem) {
// //             existingItem.quantity += quantity;
// //             await existingItem.save();
// //             return resp.status(200).send({
// //                 success: true,
// //                 message: 'Cart item updated successfully',
// //                 cartItem: existingItem,
// //             });
// //         }

// //         const cartItem = new Cart({
// //             userId,
// //             product: productId,
// //             quantity,
// //         });

// //         await cartItem.save();

// //         resp.status(201).send({
// //             success: true,
// //             message: 'Cart item created successfully',
// //             cartItem,
// //         });
// //     } catch (error) {
// //         console.error(error);
// //         resp.status(500).send({
// //             success: false,
// //             message: 'Error in creating cart item',
// //             error: error.message
// //         });
// //     }
// // };


// // Get all cart items for a specific user
// exports.getCartitem = async (req, resp) => {
//     try {
//         const userId = req.user._id;

//         const cartItems = await Cart.find({ userId })
//             .populate({
//                 path: 'product',
//                 select: '-photo', // Exclude large photo data
//                 populate: {
//                     path: 'category',
//                     model: 'Category'
//                 }
//             });

//         resp.status(200).send({
//             success: true,
//             message: 'Cart items retrieved successfully',
//             cartItems
//         });
//     } catch (error) {
//         console.error(error);
//         resp.status(500).send({
//             success: false,
//             message: 'Error getting cart items',
//             error: error.message
//         });
//     }
// };

// // exports.getCartitem = async (req, resp) => {
// //     try {
// //         const userId = req.user._id;

// //         const cartItems = await Cart.find({ userId })
// //             .populate({
// //                 path: 'product',
// //                 select: '-photo', // Exclude large photo data
// //                 populate: {
// //                     path: 'category',
// //                     model: 'Category'
// //                 }
// //             });

// //         resp.status(200).send({
// //             success: true,
// //             message: 'Cart items retrieved successfully',
// //             cartItems
// //         });
// //     } catch (error) {
// //         console.error(error);
// //         resp.status(500).send({
// //             success: false,
// //             message: 'Error getting cart items',
// //             error: error.message
// //         });
// //     }
// // };


// // Delete a cart item for a specific user
// exports.deleteCartitem = async (req, resp) => {
//     try {
//         const userId = req.user._id; // Get userId from authenticated user
//         const cartItemId = req.params.pid; // Get cart item ID from the URL parameter

//         // Delete the cart item only if it belongs to the logged-in user
//         const cartItem = await Cart.findOneAndDelete({
//             _id: cartItemId,
//             userId, // Ensure the item belongs to the user
//         });

//         if (!cartItem) {
//             return resp.status(404).send({
//                 success: false,
//                 message: 'Cart item not found or not belonging to user',
//             });
//         }

//         resp.status(200).send({
//             success: true,
//             message: 'Cart item deleted successfully',
//         });
//     } catch (error) {
//         console.error(error);
//         resp.status(500).send({
//             success: false,
//             message: 'Error deleting cart item',
//             error: error.message,
//         });
//     }
// }















                    // 2


// const Cart = require('../models/cart'); // Import the Cart model
// const User = require('../models/auth');  // Import the User model
// const Category = require('../models/category')                  ///

// // Add item to cart
// // exports.addItemToCart = async (req, resp) => {
// //     try {
// //         const { name, description, slug, price, quantity, category } = req.body;
// //         const userId = req.user._id; // Get userId from authenticated user

// //         // Check if the cart already has the product for this user
// //         const existingItem = await Cart.findOne({ userId, slug });

// //         if (existingItem) {
// //             // If the item already exists in the cart, just update the quantity
// //             existingItem.quantity += quantity;
// //             existingItem.price = price * existingItem.quantity; // Adjust price if quantity changes
// //             await existingItem.save(); // Save the updated cart item

// //             return resp.status(200).send({
// //                 success: true,
// //                 message: 'Cart item updated successfully',
// //                 cartItem: existingItem,
// //             });
// //         }

// //         // If it's a new item, create a new cart item
// //         const cartItem = new Cart({
// //             userId,
// //             name,
// //             description,
// //             slug,
// //             price,
// //             quantity,
// //             category,
// //         });

// //         await cartItem.save(); // Save new cart item

// //         resp.status(201).send({
// //             success: true,
// //             message: 'Cart item created successfully',
// //             cartItem,
// //         });
// //     } catch (error) {
// //         console.error(error);
// //         resp.status(500).send({
// //             success: false,
// //             error: error.message,
// //             message: 'Error in creating cart item',
// //         });
// //     }
// // };

// exports.addItemToCart = async (req, resp) => {
//     try {
//         const userId = req.user._id;
//         const productId = req.params.id; // product ID from URL

//         const { quantity } = req.body;

//         // Check if item already exists
//         const existingItem = await Cart.findOne({ userId, product: productId });

//         if (existingItem) {
//             existingItem.quantity += quantity;
//             await existingItem.save();
//             return resp.status(200).send({
//                 success: true,
//                 message: 'Cart item updated successfully',
//                 cartItem: existingItem,
//             });
//         }

//         const cartItem = new Cart({
//             userId,
//             product: productId,
//             quantity,
//         });

//         await cartItem.save();

//         resp.status(201).send({
//             success: true,
//             message: 'Cart item created successfully',
//             cartItem,
//         });
//     } catch (error) {
//         console.error(error);
//         resp.status(500).send({
//             success: false,
//             message: 'Error in creating cart item',
//             error: error.message
//         });
//     }
// };


// // Get all cart items for a specific user
// // exports.getCartitem = async (req, resp) => {
// //     try {
// //         const userId = req.user._id; // Get userId from authenticated user

// //         const cartItems = await Cart.find({ userId })
// //             .select('-photo') // Exclude photo data for now
// //             .limit(10)
// //             .sort({ createdAt: -1 })
// //             .populate('category'); // Populate category details

// //         resp.status(200).send({
// //             success: true,
// //             total: cartItems.length,
// //             message: 'All Cart Items retrieved successfully',
// //             cartItems,
// //         });
// //     } catch (error) {
// //         console.error(error);
// //         resp.status(500).send({
// //             success: false,
// //             message: 'Error in getting cart items',
// //             error: error.message,
// //         });
// //     }
// // };



// exports.getCartitem = async (req, resp) => {
//     try {
//         const userId = req.user._id;

//         const cartItems = await Cart.find({ userId })
//             .populate({
//                 path: 'product',
//                 select: '-photo', // Exclude large photo data
//                 populate: {
//                     path: 'category',
//                     model: 'Category'
//                 }
//             });

//         resp.status(200).send({
//             success: true,
//             message: 'Cart items retrieved successfully',
//             cartItems
//         });
//     } catch (error) {
//         console.error(error);
//         resp.status(500).send({
//             success: false,
//             message: 'Error getting cart items',
//             error: error.message
//         });
//     }
// };


// // Delete a cart item for a specific user
// exports.deleteCartitem = async (req, resp) => {
//     try {
//         const userId = req.user._id; // Get userId from authenticated user
//         const cartItemId = req.params.pid; // Get cart item ID from the URL parameter

//         // Delete the cart item only if it belongs to the logged-in user
//         const cartItem = await Cart.findOneAndDelete({
//             _id: cartItemId,
//             userId, // Ensure the item belongs to the user
//         });

//         if (!cartItem) {
//             return resp.status(404).send({
//                 success: false,
//                 message: 'Cart item not found or not belonging to user',
//             });
//         }

//         resp.status(200).send({
//             success: true,
//             message: 'Cart item deleted successfully',
//         });
//     } catch (error) {
//         console.error(error);
//         resp.status(500).send({
//             success: false,
//             message: 'Error deleting cart item',
//             error: error.message,
//         });
//     }
// }










// const Cart = require("../models/cart");
// exports.addItemToCart = async (req, resp) => {
//     try {
//         const { name, description, slug, price, quantity, category } = req.body
//         console.log(req.body)

//         const cartitem = new Cart(req.body)

//         await cartitem.save()
//         resp.status(201).send({
//             success: true,
//             message: "cartitem created successfully",
//             cartitem
//         })
//     } catch (error) {
//         resp.status(500).send({
//             success: false,
//             error,
//             message: "Error in creating cartitem"
//         })
//     }
// }
// exports.getCartitem = async (req, resp) => {
//     try {
//         const cartitem = await Cart.find({}).select("-photo").limit(10).sort({ createdAt: -1 }).populate("category")
//         resp.status(200).send({
//             success: true,
//             total: cartitem.length,
//             message: "All Products",
//             cartitem,

//         })
//     } catch (error) {
//         resp.status(500).send({
//             success: false,
//             message: "Error in getting products",
//             error: error.message
//         })
//     }
// }
// exports.deleteCartitem = async (req, resp) => {
//     try {
//         await Cart.findByIdAndDelete(req.params.pid).select("-photo")
//         resp.status(200).send({
//             success: true,
//             message: "Cart item deleted successfully",
//         })
//     } catch (error) {
//         resp.status(500).send({
//             success: false,
//             message: "Error deleting Cartitem",
//             error
//         })
//     }
// }














// const Cart = require("../models/cart");
// exports.addItemToCart = async (req, resp) => {
//     try {
// const { name, description, slug, price, quantity, category } = req.body  //   28-Apr-25
//         console.log(req.body)

//         const cartitem = new Cart(req.body)

//         await cartitem.save()
//         resp.status(201).send({
//             success: true,
//             message: "cartitem created successfully",
//             cartitem
//         })
//     } catch (error) {
//         resp.status(500).send({
//             success: false,
//             error,
//             message: "Error in creating cartitem"
//         })
//     }
// }
// exports.getCartitem = async (req, resp) => {
//     try {
//         const cartitem = await Cart.find({}).select("-photo").limit(10).sort({ createdAt: -1 }).populate("category")
//         resp.status(200).send({
//             success: true,
//             total: cartitem.length,
//             message: "All Products",
//             cartitem,

//         })
//     } catch (error) {
//         resp.status(500).send({
//             success: false,
//             message: "Error in getting products",
//             error: error.message
//         })
//     }
// }
// exports.deleteCartitem = async (req, resp) => {
//     try {
//         await Cart.findByIdAndDelete(req.params.pid).select("-photo")
//         resp.status(200).send({
//             success: true,
//             message: "Cart item deleted successfully",
//         })
//     } catch (error) {
//         resp.status(500).send({
//             success: false,
//             message: "Error deleting Cartitem",
//             error
//         })
//     }
// }

// const { cartitem, quantity, price } = req.body
// const cart = new Cart({
//     cartitem,
//     quantity,
//     price
// })
// cart.save().then((error, cart) => {
//     if (error) {
//         return resp.status(400).json({ error })
//     }
//     if (cart) {
//         return resp.status(201).json({ cart })
//     }
// })



//     {Cart.findOne({ user: req.user._id }).exec((error, cart) => {
//         if (error) return res.status(400).json({ error });
//         if (cart) {
//             //if cart already exists then update cart by quantity
//             let promiseArray = [];

//             req.body.cartItems.forEach((cartItem) => {
//                 const cartitem = cartItem.cartitem;
//                 const item = cart.cartItems.find((c) => c.cartitem == cartitem);
//                 let condition, update;
//                 if (item) {
//                     condition = { user: req.user._id, "cartItems.cartitem": cartitem };
//                     update = {
//                         $set: {
//                             "cartItems.$": cartItem,
//                         },
//                     };
//                 } else {
//                     condition = { user: req.user._id };
//                     update = {
//                         $push: {
//                             cartItems: cartItem,
//                         },
//                     };
//                 }
//                 promiseArray.push(runUpdate(condition, update));

//             });
//             Promise.all(promiseArray)
//                 .then((response) => res.status(201).json({ response }))
//                 .catch((error) => res.status(400).json({ error }));
//         } else {
//             //if cart not exist then create a new cart
//             const cart = new Cart({
//                 user: req.user._id,
//                 cartItems: req.body.cartItems,
//             });
//             cart.save((error, cart) => {
//                 if (error) return res.status(400).json({ error });
//                 if (cart) {
//                     return res.status(201).json({ cart });
//                 }
//             });
//         }
//     });
// };






//original


// const Cart = require("../models/cart");
// exports.addItemToCart = (req, resp) => {
//     async (req, resp) => {
//         try {
//             const { name, description, price, quantity, category } = req.fields
//             const { photo } = req.files
//             console.log(req.files)
//             switch (true) {
//                 case !name:
//                     return resp.status(500).send({ error: "Name is required" })
//                 case !description:
//                     return resp.status(500).send({ error: "Description is required" })
//                 case !price:
//                     return resp.status(500).send({ error: "Price is required" })
//                 case !quantity:
//                     return resp.status(500).send({ error: "Quantity is required" })
//                 case !category:
//                     return resp.status(500).send({ error: "Category is required" })
//                 case !photo && photo.size > 1000000:
//                     return resp.status(500).send({ error: "Photo is required and should be less than 1Mb" })
//             }
//             const cartitem = new Cart({ ...req.fields })
//             if (photo) {
//                 cartitem.photo.data = fs.readFileSync(photo.path)
//                 cartitem.photo.contentType = photo.type
//             }
//             await cartitem.save()
//             console.log(cartitem)
//             resp.status(201).send({
//                 success: true,
//                 message: "cartitem created successfully",
//                 cartitem
//             })

//         } catch (error) {
//             resp.status(500).send({
//                 success: false,
//                 error,
//                 message: "Error in creating cartitem"
//             })
//         }
//     }
// }


































