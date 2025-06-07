const express = require('express')
const dotenv = require('dotenv') //
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const morgan = require('morgan') //
const userRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const cartRoutes = require("./routes/cart")
const dashboardRoutes = require("./routes/admin/dashboard")
dotenv.config({ path: './.env' }) // //
mongoose.connect('mongodb://0.0.0.0:27017/ecommerce').then(() => {
    console.log("Database Connected")
})

app.use(express.json())
app.use(morgan('dev'))  //
app.use(cors())
app.use('/api', userRoutes)
app.use('/api', require('./routes/product'));
app.use('/', adminRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', cartRoutes)
app.use('/api', dashboardRoutes)
app.listen(process.env.PORT || 4101)
// app.listen(4101)

