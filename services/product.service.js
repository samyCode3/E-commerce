const Product = require("../model/Product")

//CREATE
const  PostProduct = async (req, res) => {
    const  newProduct = new Product(req.body)
    try {
        await newProduct.save().then((data) => {
            if(data) res.status(200).json({ sta: data})
        })
      
    } catch (err) 
    {
        if(err) res.status(500).json({status: 500, msg: err.message})
    }
  
}
//Read By Id
const GetProduct = async(req, res) => {
    try 
    {
        await Product.findById(req.params.id).then((data) => {
            if(data) return res.status(200).json(data)
           return res.status(400).json({ error: "can't find any product"})
        }) 

    } catch(err){
        
        if(err) res.status(500).json({status: 500, msg: err.message})
    }
}
// Get All Product 
const GetAvailableProduct = async(req, res) => {
    const qNew = req.query.new
    const qCategory = req.query.category
    try {
       let products;
       if(qNew) 
       {
        products = await Product.find().sort({ createdAt: -1}).limit(1)
       } else if(qCategory) 
       {
        products = await Product.find({
            categories: {
                $in: [qCategory]
            }
        })
       } else 
       {
        products = await Product.find()
       }
       res.status(200).json(products)
       
    }catch (err)
    {
        if(err) res.status(500).json({status: 500, msg: "Internal server error"})
    }
}

//Update
const UpdateProduct = async (req, res) =>{
    try 
    {
     await Product.findByIdAndUpdate(req.params.id, {
        $set: req.body,
     }, {new: true}).then((data) => {
        if(data) res.status(200).json({ status: 200, ok: data})
     })
    } catch (err)
    {
        if(err) res.status(500).json({status: 500, msg: "Internal server error"})
        
    }
}

//Delete
const DeleteProduct = async (req, res) => {
  try 
  {
    await Product.findByIdAndDelete(req.params.id).then((data) => {    
        if(data) res.status(200).json({status: 200, msg: "This product was deleted"})
    })
  } catch (err)
  {
    if(err) res.status(500).json({status: 500, msg: "Internal server error"})
  }
}
//Stats

module.exports = {
    PostProduct,
    GetProduct,
    GetAvailableProduct,
    UpdateProduct,
    DeleteProduct
}