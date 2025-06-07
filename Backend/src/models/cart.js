// const mongoose=require('mongoose')
// const cartSchema=new mongoose.Schema({
//    name:{
//       type:String,
//       required:true,
//       trim:true
//   },
//   slug: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   price:{
//       type:Number,
//       required:true
//   },
//   quantity:{
//       type:Number,
//       required:true
//   },
//   description:{
//       type:String,
//       required:true,
//       trim:true
//   },
//   category:{
//       type:mongoose.ObjectId,
//       ref:'category',
//       required:true
//   },
//   photo:{
//       data:Buffer,
//       contentType:String
//   }


// },{timestamps:true})
// module.exports=mongoose.model("Cart",cartSchema)





//28-05-25

// const mongoose = require('mongoose');
// const Category = require('../models/category')                ///
// const cartSchema = new mongoose.Schema(
//     {
//         userId: {
//             type: mongoose.Schema.Types.ObjectId,                 //edit
//             ref: 'User', // Assuming you have a User model
//             required: true,
//         },
//         quantity: {
//             type: Number,
//             required: true,
//         },
//         product: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'product',
//             required: true
//         },

//         ///hide this name - photo

//         // name: {
//         //     type: String,
//         //     required: true,
//         //     trim: true,
//         // },
//         // slug: {
//         //     type: String,
//         //     required: true,
//         //     unique: true,
//         // },
//         // price: {
//         //     type: Number,
//         //     required: true,
//         // },

//         // description: {
//         //     type: String,
//         //     required: true,
//         //     trim: true,
//         // },
//         // category: {
//         //     type: mongoose.ObjectId,
//         //     ref: 'Category',
//         //     required: true,
//         // },

//         // photo: {
//         //     data: Buffer,
//         //     contentType: String,
//         // },
//     },
//     { timestamps: true }
// );

// module.exports = mongoose.model('Cart', cartSchema);











///      This GPT Version         ///

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // ensure this matches your user model name
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    // Remove photo here unless really needed, it should come from product
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);



//      gpt 2


// const mongoose = require('mongoose');

// const cartSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     product: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Product',
//         required: true
//     },
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     slug: {
//         type: String,
//         required: true,
//         trim: true
//         // unique: true ❌ काढलं आहे
//     },
//     price: {
//         type: Number,
//         required: true
//     },
//     quantity: {
//         type: Number,
//         required: true,
//         default: 1
//     },
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     category: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Category',
//         required: true
//     }
// }, { timestamps: true });

// module.exports = mongoose.model("Cart", cartSchema);











//    this working but gpt say no

// const mongoose = require('mongoose');
// const cartSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'users',
//         required: true
//     },
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     slug: {
//         type: String,
//         required: true,
//     },
//     price: {
//         type: Number,
//         required: true
//     },
//     quantity: {
//         type: Number,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     category: {
//         type: mongoose.ObjectId,
//         ref: 'Category',
//         required: true
//     },
//     // product: {
//     //     type: mongoose.Schema.Types.ObjectId,
//     //     ref: 'Product',
//     //     required: true
//     // },
//     photo: {
//         data: Buffer,
//         contentType: String
//     }
// }, { timestamps: true });

// module.exports = mongoose.model("Cart", cartSchema);






///the GPT code

// const mongoose = require('mongoose');

// const cartSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'users',
//         required: true
//     },
//     // name: {
//     //     type: String,
//     //     required: true,
//     //     trim: true
//     // },
//     // price: {
//     //     type: Number,
//     //     required: true
//     // },
//     product: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Product',
//         required: true
//     },
//     quantity: {
//         type: Number,
//         required: true,
//         default: 1
//     }
// }, { timestamps: true });

// module.exports = mongoose.model("Cart", cartSchema);
