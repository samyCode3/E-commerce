const Cart = require("../model/Cart")

//CREATE
const  PostCart = async (req, res) => {
    const  newCart = new Cart(req.body)
    try {
        await newCart.save().then((data) => {
            if(data) res.status(200).json({ sta: data})
        })
      
    } catch (err) 
    {
        if(err) res.status(500).json({status: 500, msg: "Internal server error"})
    }
  
}
//Read By Id
const GetCart = async(req, res) => {
    try 
    {
        await Cart.findOne({_id : req.params.id}).then((data) => {
            if(data) res.status(200).json(data)
        })   

    } catch(err){
        if(err) res.status(200).json({ status: 200, ok: data})
    }
}
// Get All Cart 
const GetAvailableCart = async(req, res) => {
   try 
   {
   const carts = await Cart.find()
   res.status(200).json(carts)
}catch(err){
    if(err) res.status(200).json({ status: 200, ok: data})
}
}
//Update Cart 
const UpdatedCart = async (req, res) => {
    try 
    {
        const updatedCart =  await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
    } catch(err) 
    {
        if(err) res.status(200).json({ status: 200, ok: data})
    }
}

//Delete Cart 
const DeleteCart = async (req, res) => {
    try 
    {
      await Cart.findByIdAndDelete(req.params.id).then((data) => {    
          if(data) res.status(200).json({status: 200, msg: "This Cart was deleted"})
      })
    } catch (err)
    {
      if(err) res.status(500).json({status: 500, msg: "Internal server error"})
    }
  }

module.exports = {
    PostCart,
    GetCart,
    GetAvailableCart,
    UpdatedCart,
    DeleteCart
}