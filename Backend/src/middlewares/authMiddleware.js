// const jwt = require('jsonwebtoken')
// const users = require('../models/auth')

// //Protected Routes token base
// exports.requireSignin = async (req, resp, next) => {

//     try {
//         const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
//         req.user = decode
//         next()
//     } catch (error) {
//         console.log(error)
//     }
// }

// // admin access
// exports.isAdmin = async (req, resp, next) => {
//     try {
//         const user = await users.findById(req.user._id)
//         if (user.role !== "admin") {
//             return resp.status(401).send({
//                 success: false,
//                 message: "Unauthorized Access"
//             })
//         }
//         else {
//             next()
//         }

//         next()
//     } catch (error) {
//         console.log(error)
//         resp.status(401).send({
//             success: false,
//             message: "Error in Admin middleware",
//             error
//         })
//     }
// }




// const jwt = require('jsonwebtoken')
// const users = require('../models/auth')

// // Protected Routes token base
// exports.requireSignin = async (req, resp, next) => {
//     console.log("Received Token:", req.headers.authorization);
//     try {
//         // const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
//         // req.user = decode
//         const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
//         req.user = decode;

//         next()
//     } catch (error) {
//         console.log(error)
//         return resp.status(401).send({
//             success: false,
//             message: "Unauthorized: Invalid or expired token",
//         })
//     }
// }

// // Admin access middleware
// exports.isAdmin = async (req, resp, next) => {
//     try {
//         const user = await users.findById(req.user._id)
//         if (!user || user.role !== "admin") {
//             return resp.status(401).send({
//                 success: false,
//                 message: "Unauthorized Access - Admin only",
//             })
//         }
//         next() // Call once here only
//     } catch (error) {
//         console.log(error)
//         resp.status(401).send({
//             success: false,
//             message: "Error in Admin middleware",
//             error,
//         })
//     }
// }



const jwt = require('jsonwebtoken');
const users = require('../models/auth');

// ✅ Middleware: Token verification
exports.requireSignin = async (req, resp, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return resp.status(401).send({
                success: false,
                message: "Authorization header missing or malformed",
            });
        }
        // ✅ Get only token part after "Bearer "
        const token = authHeader.split(" ")[1];
        // ✅ Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // store user info in request
        console.log("Decoded Token:", decoded);
        next();
    } catch (error) {
        console.log("JWT Error:", error.message);
        return resp.status(401).send({
            success: false,
            message: "Unauthorized: Invalid or expired token",
        });
    }
};

// ✅ Middleware: Admin access check
exports.isAdmin = async (req, resp, next) => {
    try {
        const user = await users.findById(req.user._id);

        if (!user || user.role !== "admin") {
            return resp.status(401).send({
                success: false,
                message: "Unauthorized Access - Admin only",
            });
        }

        next(); // ✅ Proceed if admin
    } catch (error) {
        console.log("Admin Middleware Error:", error.message);
        resp.status(401).send({
            success: false,
            message: "Error in Admin middleware",
            error,
        });
    }
};
