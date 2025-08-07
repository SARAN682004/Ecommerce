const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/connectDB')
const cors = require('cors')

// MongoDB
connectDB()

// Express app
const app = express()

// ✅ CORS (Fixed)
app.use(cors({
    origin: ['http://localhost:5173', 'https://ecommerce-dusky-six.vercel.app'], 
    credentials: true
}))

// Body parser
app.use(express.json())

// Routes
app.use('/api/products', require('./routes/productRoute'))
app.use('/api/users', require('./routes/userRoutes'))

// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Something Went Wrong!"
    })
})

// Server
const port = process.env.PORT || 4001
app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
})
