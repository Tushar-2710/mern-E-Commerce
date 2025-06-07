const User = require('../../models/auth')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.signup = (req, resp) => {
    User.findOne({ email: req.body.email }).then(async (error, admin) => {
        if (admin)
            return resp.status(400).json({
                message: "User already registered"
            })

        const { firstName, lastName, email, password } = req.body
        const hash_password = await bcrypt.hash(password, 10)
        const _user = new User({
            firstName,
            lastName,
            email,
            role,
            hash_password,
            userName: Math.random().toString()
        })
        _user.save().then((error, admin) => {
            if (error) {
                return resp.status(400).json({
                    message: "Something Went wrong"
                })
            }
            if (admin) {
                const token = generateJwtToken(admin._id, admin.role)
                const { _id, firstName, lastName, email, role, fullName } = admin

                return resp.status(201).json({
                    token,
                    admin: { _id, firstName, lastName, email, role, fullName }
                })
            }
        })
    })
}


//ORIGINAL


// exports.signin = (req, resp) => {
//     User.findOne({ email: req.body.email }).then(async (error, admin) => {
//         if (error) {
//             return resp.status(400).json({ error })
//         }
//         if (admin) {
//             const isPassword = await admin.authenticate(req.body.password)
//             if (isPassword && admin.role === "admin") {
//                 const token = generateJwtToken(admin, _id, admin.role)
//                 const { _id, firstName, lastName, email, role, fullName } = admin
//                 resp.status(200).json({
//                     token,
//                     admin: { _id, firstName, lastName, email, role, fullName }
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







exports.signin = async (req, resp) => {
    try {
        const admin = await User.findOne({ email: req.body.email });
        if (!admin) {
            return resp.status(404).json({ message: "Admin not found" });
        }

        const isPassword = await bcrypt.compare(req.body.password, admin.password);

        if (isPassword && admin.role === "admin") {
            const token = jwt.sign(
                { _id: admin._id, role: admin.role, email: admin.email },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            const { _id, firstName, lastName, email, role } = admin;

            resp.status(200).json({
                token,
                admin: { _id, firstName, lastName, email, role },
            });
        } else {
            return resp.status(400).json({
                message: "Invalid Credentials or not admin",
            });
        }
    } catch (error) {
        console.log(error);
        return resp.status(500).json({ error: "Internal Server Error" });
    }
};
