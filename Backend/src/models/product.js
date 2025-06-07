// const mongoose = require('mongoose')
// const productSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     slug: {
//         type: String,
//         required: true,
//         unique: true
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
//         // type: mongoose.ObjectId,
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Category',                                    ///Category
//         required: true
//     },
//     photo: {
//         data: Buffer,
//         contentType: String
//     }
// }, { timestamps: true })

// module.exports = mongoose.model('Product', productSchema)





const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    photo: {
        data: Buffer,
        contentType: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema); // ✅ make sure model name is 'Product'
