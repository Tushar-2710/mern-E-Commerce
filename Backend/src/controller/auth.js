const users = require('../models/auth')
//const orders = require('../models/auth')
const JWT = require('jsonwebtoken')
const { hashPassword, comparePassword } = require('../helpers/authHelper')
exports.signup = async (req, resp) => {
    try {
        const { firstName, lastName, password, email, phone, address } = req.body
        if (!firstName) {
            return resp.send({ error: "First Name is required" })
        }
        if (!lastName) {
            return resp.send({ error: "Last Name is required" })
        }
        if (!email) {
            return resp.send({ error: "Email is required" })
        }
        if (!password) {
            return resp.send({ error: "Password is required" })
        }
        if (!phone) {
            return resp.send({ error: "Phone Number is required" })
        }
        if (!address) {
            return resp.send({ error: "Address is required" })
        }
        //check user
        const existinguser = await users.findOne({ email })
        //exisiting user
        if (existinguser) {
            return resp.status(200).send({
                success: true,
                message: "Already registered please login"
            })
        }
        // signup user
        const hashedPassword = await hashPassword(password)
        //save
        const user = await new users({ firstName, lastName, email, phone, address, password: hashedPassword }).save()
        resp.status(200).send({
            success: true,
            message: "User registerred successfully",
            user
        })
    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message: "Error in Signup",
            error
        })
    }
}
exports.signin = async (req, resp) => {
    try {
        const { email, password } = req.body
        //validation
        if (!email || !password) {
            return resp.status(404).send({
                success: false,
                message: "Invalid email or password"
            })
        }
        // check user
        const user = await users.findOne({ email })
        if (!user) {
            return resp.status(404).send({
                success: false,
                message: "Email is not registerred"
            })
        }
        const match = await comparePassword(password, user.password)

        if (!match) {
            return resp.status(200).send({
                success: false,
                message: "Invalid password"
            })
        }
        // token creation
        const token = await JWT.sign({ _id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
        resp.status(200).send({
            success: true,
            message: "Signin successful",
            user: {
                _id: user._id,      //
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,        //
            },
            token,
        })
    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message: "Error in signin",
            error
        })
    }

}

  //test controller 27-03-24
  exports.testController = (req, resp) => {
    try {
      resp.send("Protected Routes");
    } catch (error) {
      console.log(error);
      resp.send({ error });
    }
  };

// //forgotPasswordController 27-03-24

// export const forgotPasswordController = async (req, res) => {
//     try {
//       const { email, answer, newPassword } = req.body;
//       if (!email) {
//         res.status(400).send({ message: "Emai is required" });
//       }
//       if (!answer) {
//         res.status(400).send({ message: "answer is required" });
//       }
//       if (!newPassword) {
//         res.status(400).send({ message: "New Password is required" });
//       }
//       //check
//       const user = await userModel.findOne({ email, answer });
//       //validation
//       if (!user) {
//         return res.status(404).send({
//           success: false,
//           message: "Wrong Email Or Answer",
//         });
//       }
//       const hashed = await hashPassword(newPassword);
//       await userModel.findByIdAndUpdate(user._id, { password: hashed });
//       res.status(200).send({
//         success: true,
//         message: "Password Reset Successfully",
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         success: false,
//         message: "Something went wrong",
//         error,
//       });
//     }
//   };
  


//orders //102-114 25-03-24
// const getOrdersController = async (req, res) => {
//     try {
//         const orders = await Orders.find({ buyer: req.user._id }).populate("products", "-photo").populate("buyer", "name")
//         res.json(orders)
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success: false,
//             message: "Error while Getting Orders",
//             error
//         })
//     }
// }


// const User = require('../models/auth')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// exports.signup = (req, resp) => {
//     User.findOne({ email: req.body.email }).then(async (error, user) => {
//         if (user)
//             return resp.status(400).json({
//                 message: "User already registered"
//             })


//         const { firstName, lastName, email, password } = req.body
//         const hash_password = await bcrypt.hash(password, 10)
//         const _user = new User({
//             firstName,
//             lastName,
//             email,

//             hash_password,
//             userName: Math.random().toString()
//         })
//         _user.save().then((error, user) => {
//             if (error) {
//                 return resp.status(400).json({
//                     message: "Something Went wrong"
//                 })
//             }
//             if (user) {
//                 const token = generateJwtToken(user._id, user.role)
//                 const { _id, firstName, lastName, email, role, fullName } = user

//                 return resp.status(201).json({
//                     token,
//                     user: { _id, firstName, lastName, email, role, fullName }
//                 })
//             }
//         })
//     })
// }
// exports.signin = (req, resp) => {
//     User.findOne({ email: req.body.email }).then(async (error, user) => {
//         if (error) {
//             return resp.status(400).json({ error })
//         }
//         if (user) {
//             const isPassword = await user.authenticate(req.body.password)
//             if (isPassword && user.role === "user") {
//                 const token = generateJwtToken(user, _id, user.role)
//                 const { _id, firstName, lastName, email, role, fullName } = user
//                 resp.status(200).json({
//                     token,
//                     user: { _id, firstName, lastName, email, role, fullName }
//                 })
//             }
//             else {
//                 return resp.status(400).json({
//                     message: "Something Went wrong"
//                 })
//             }
//         }
//     })
// }

