const express = require('express')
const { signup, signin, testController, } = require('../controller/auth')
const { requireSignin, isAdmin } = require('../middlewares/authMiddleware')
const router = express.Router()

//routing
router.post('/signup', signup)
router.post('/signin', signin)

//test routes
router.get("/test", requireSignin, isAdmin, testController);

//protected User route auth
router.get('/user-auth', requireSignin, (req, resp) => {
    resp.status(200).send({ ok: true })
})
//protected Admin route auth
router.get('/admin-auth', requireSignin, isAdmin, (req, resp) => {
    resp.status(200).send({ ok: true })
})


module.exports = router


//Original
// const express = require('express')
// const { signup, signin } = require('../controller/auth')
// const router = express.Router()

// router.post('/signup', signup)
// router.post('/signin', signin)

// module.exports = router