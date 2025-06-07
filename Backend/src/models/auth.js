const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 4,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 4,
        max: 20
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true  // //
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true // //
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
        
    },
    // role: {
    //     type: Number,
    //     default: 0
    // },
    salt: {
        type: String,
    }
}, { timestamps: true })

module.exports = mongoose.model('users', userSchema)





// const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')

// const userSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: true,
//         trim: true,
//         min: 4,
//         max: 20
//     },
//     lastName: {
//         type: String,
//         required: true,
//         trim: true,
//         min: 4,
//         max: 20
//     },
//     userName: {
//         type: String,
//         required: true,
//         trim: true,
//         unique: true,
//         index: true,
//         //lowercase: true
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         unique: true,
//         //lowercase: true
//     },
//     hash_password: {
//         type: String,
//         required: true
//     },
//     role: {
//         type: String,
//         enum: ['user', 'admin'],
//         default: 'user'
//     },
//     contactNumber: {
//         type: String
//     },
//     profilePicture: {
//         type: String
//     }
// }, { timestamps: true })
// userSchema.virtual('password').set(function (password) {
//     this.hash_password = bcrypt.hashSync(password, 10)
// })
// userSchema.methods = {
//     authenticate: function (password) {
//         return bcrypt.compare(password, this.hash_password)
//     }
// }
// module.exports = mongoose.model('user', userSchema)
