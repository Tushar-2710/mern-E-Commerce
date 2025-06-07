const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,           // ✅ optional, good practice
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,           // ✅ optional, good practice
    },
}, { timestamps: true });     // ✅ recommended: adds createdAt/updatedAt

module.exports = mongoose.model("Category", categorySchema);            ////"Category"



//original
// const mongoose = require('mongoose')
// const categorySchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     type: { type: String },
//     categoryImage: { type: String },
//     parentId: { type: String },
//     // createdBy: {
//     //     type: mongoose.Schema.Types.ObjectId,
//     //     ref: "user",
//     //     required: true
//     // }
// }, { timestamps: true })
// module.exports = mongoose.model("category", categorySchema)