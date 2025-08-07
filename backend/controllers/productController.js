const Product = require('../model/Product')
const productData = require('../data/product.json')


//Get Products

const getProducts = async(req,res)=>{
    try{
       const products = await Product.find()
       res.json(products)   

    }catch(e){
        next()
    }  
}

//Updade Products

const updateProduct = async(req,res)=>{
    const {name,price,description}  = req.body
    const updated = await Product.findByIdAndUpdate(req.params.id,{
         name,
         price,
         description
    },{
        new:true
    })
    res.json(updated)
}  


const searchProduct = async (req, res) => {
  try {
    const keyword = req.query.q || '';
    const results = await Product.find({
      name: { $regex: new RegExp(keyword, 'i') }
    });
    res.json({ success: true, results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const seedProducts = async (req, res) => {
  await Product.deleteMany();
  const seeded = await Product.insertMany(productData);
  res.json(seeded);
};



module.exports = {getProducts,updateProduct,searchProduct,seedProducts}