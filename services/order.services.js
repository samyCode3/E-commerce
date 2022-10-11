const Order = require("../model/Order")

//CREATE
const  PostOrder = async (req, res) => {
    const  newOrder = new Order(req.body)
    try {
        await newOrder.save().then((data) => {
            if(data) res.status(200).json({ sta: data})
        })
      
    } catch (err) 
    {
        if(err) res.status(500).json({status: 500, msg: err.message})
    }
  
}
//Read By Id
const GetOrder = async(req, res) => {
    try 
    {
        await Order.find({unique_id : req.params.unique_id}).then((data) => {
            if(data) res.status(200).json(data)
        })   

    } catch(err){
        if(err) res.status(200).json({ status: 200, ok: data})
    }
}
// Get All Order only admin
const GetAvailableOrder = async(req, res) => {
   try 
   {
   const Orders = await Order.find()
   res.status(200).json(Orders)
}catch(err){
    if(err) res.status(200).json({ status: 200, ok: data})
}
}
//Update Order only admin 
const UpdatedOrder = async (req, res) => {
    try 
    {
        const updatedOrder =  await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        res.status(200).json({status: 200, msg: "Your Order have been Updated"})
    } catch(err) 
    {
        if(err) res.status(200).json({ status: 200, ok: "Your Order have been updated"})
    }
}
//Delete Order only admin 
const DeleteOrder = async (req, res) => {
    try 
    {
      await Order.findByIdAndDelete(req.params.id).then((data) => {    
          if(data) res.status(200).json({status: 200, msg: "This Order was deleted"})
      })
    } catch (err)
    {
      if(err) res.status(500).json({status: 500, msg: "Internal server error"})
    }
  }
  // Get Yearly  Incomes
const  Incomes = async(req, res) =>{
    const date = new Date();
    const  lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const  previousMonth =  new Date( new Date().setMonth(lastMonth.getMonth() - 1))
    try 
    {
     const Income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth }}},
        {
            $project: {
                month: { $month: "$createdAt" },
                sales: "$amount"
            },
           
        },
        {
            $group: {
                _id: "$month",
                total: { $sum : "$sales" }
            }
        }
        
     ]);
     res.send(Income)
    } catch (err) 
    {
        if(err) res.status(500).json({status: 500, msg: "Internal server error"})
    }
} 

module.exports = {
    PostOrder,
    GetOrder,
    GetAvailableOrder,
    UpdatedOrder,
    DeleteOrder,
    Incomes
}