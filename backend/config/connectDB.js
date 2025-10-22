const mongoose = require('mongoose')


const connectDB = async()=>{
    try{
          await mongoose.connect("mongodb+srv://ecommerce:ecom123@cluster0.zqa5mza.mongodb.net/Ecommerce_App")
          console.log("Database Connected")

    }catch(err)
    {
        console.error(err)
    }
}


module.exports = connectDB