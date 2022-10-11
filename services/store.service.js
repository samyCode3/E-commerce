const AdminStore = require("../model/store")



const createStore = async (req, res) => {

  try {
    const AdminId = req.params.id

    await AdminStore.find({AdminId}).then((id) => {
      if (id.length > 0) {
        for (let i = 0; i < id.length; i++) {
          if (id[i].id === AdminId) {
           return res.status(403).json({ status: "error", message: "You have created a store already or try another store name" })
          } 

        }
       
      } 
      const StoreCreate = new AdminStore({
        store_id: req.params.id,
        avater: req.file.path,
        store: req.body.store.toLowerCase(),
        email: req.body.email.toLowerCase(),
        phone: req.body.phone,
        Bank: {
          bank: req.body.bank,
          banknumber: req.body.banknumber
        },
        address: {
          country: req.body.country,
          city: req.body.city,
          portalcode: req.body.potalcode,
          fullAddress:
          {
            doornumber: req.body.doornumber,
            street: req.body.street
          }


        }
      })

      StoreCreate.save().then((data) => {
        if (data)  res.status(200).json({ status: "success", message: "Your store is beem created", data: data })
      })
    })

  } catch (err) {
    if (err) res.status(500).json({status: 500, msg: "Internal server error"})
  }

}
// rename store name
const UpdateStore= async (req, res) => {
  try 
  {
 const updateStore =    await AdminStore.findByIdAndUpdate(req.params.id, {
     $set: req.body,

    },
    {new: true}
    )
    res.status(200).json(updateStore)
  } catch (err) 
  {
   if(err) res.status(500).json({status: 500, msg: "Internal server error"})

   }
}
// Get store By name 
const GetStores  = async (req, res) => {
  const query = req.query.new
  try 
  {
    const store = query
    ? await AdminStore.find().sort({ _id: -1}).limit(1) : await AdminStore.find();
    res.status(200).json(store);
  } catch (err)
  {
     if(err) res.status(500).json({status: 500, msg: "Internal server error"})
  }
}
// get store by id
const GetStoreById = async (req, res) => {
  try 
  {
       await AdminStore.find({ _id: req.params.id}).then((data) =>{
       if(!data) return res.status(404).json({ status: "error", error :"You don't have any active store"})
       if(data) res.status(200).json({ status: "ok", ok: data})
    })
   
  } catch (err)
  {
     if(err) res.status(500).json({status: 500, msg: "Internal server error"})
  }
}
// Delete Store
const deleteStore = async (req, res) => {
  try 
  {
    await AdminStore.findByIdAndDelete(req.params.id).then((data)=>{
      if(data) return res.status(200).json({status: 200, message: "Deletion was successfull"})
      res.status(400).json({status: "error", msg: "Deletion was not successfull"})
    })
  } catch (err)
  {
     if(err) res.status(500).json({status: 500, msg: "Internal server error"})
  }
}
module.exports =
{
  createStore,
  UpdateStore,
  deleteStore,
  GetStores,
  GetStoreById
}