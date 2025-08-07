const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/connectDB')
const cors = require('cors')

//MongoDB
connectDB()

//Express app
const app = express();

//CORS
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));

//Body-Parser
app.use(express.json())

//Routes
app.use('/api/products',require('./routes/productRoute'))
app.use('/api/users',require('./routes/userRoutes'))

//Port Declaration
const port  = process.env.PORT || 4001


//Error Handling Middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Something Went Wrong!"
    });
});



//Server running
app.listen(port,()=>{
    console.log(`The server is running on port ${port}`)
})

