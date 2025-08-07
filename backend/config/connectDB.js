const mongoose = require('mongoose')


const connectDB = async()=>{
    try{
          await mongoose.connect("mongodb+srv://ksaran0006:mern1@cluster0.pipthia.mongodb.net/Mern1")
          console.log("Database Connected")

    }catch(err)
    {
        next()
    }
}


module.exports = connectDB