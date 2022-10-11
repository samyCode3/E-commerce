const Admin = require("../model/Admin");
const bcrypt = require("bcryptjs")
const { v4: uuidV4 } = require("uuid");
const auth = require("../middleware/admin.auth")

const register = async(req, res) => {
  const {name, username, email, password, password2} = req.body
  if(!name || !username || !email || !password) return res.status(403).json({status: "error-message", message: "All field are required"});
  if(password.length < 8) return res.status(401).json({status: "error-message", message: "Password should be at 8 characters"});
  if(/^[a-zA-Z0-9]*$/.test(password))return res.json({ status : "error", error: "Choose a stronger password"})
  if(password !== password2) return res.status(401).json({status: "error-message", message: "Passwords not thesame"});
  const NewPassword  = await bcrypt.hash(password, 8);
  await Admin.findOne({email: email.toLowerCase()}).then((data) => {
    if(data) return res.status(401).json({status: "error-message", message: "Email is used to verify other account"});
    const MyAdmin = new Admin({
        unique_id : uuidV4(),
        name: name,
        username: username,
        email: email,
        password: NewPassword,
        image: req.file.path
    })
   
    MyAdmin.save().then((data) => {
      const token =  auth.generateAdminToken(data.unique_id)
      data.token = token
        return res.status(200).json({status:"Success-message", message: "Admin was successfully registered",  token: token})
    })
  }).catch(err => {
     if(err) res.status(500).json({status: 500, msg: err.message})
  })
 
}
//Login Admin

const login = async (req, res, callback) => {
    const { email, password } = req.body
    if (!email || !password) return res.json({ status: "error-message", error: "Invaild User Detail provided" })

    Admin.findOne({ email: email }).then(async (data) => {
        if (!data || !await bcrypt.compare(password, data.password)) return res.json({ status: "error", error: "Email or password is incorrect" })
        const unique_id = data.unique_id
        const token =  auth.generateAdminToken(unique_id)
        data.token = token
        return res.json({ status: "success", success: data, token : token })
    }).catch(err => {
        if(err) res.status(500).json({status: 500, msg: err.message})
    })
}
//Collect User Data

const adminProfile = async (req, res, next) => {
     const MyUser = req.data.data
     await Admin.find({unique_id: MyUser}).then((user) => {
        if(MyUser) res.json({status: "ok", ok: user})

     })
     
    }

 
    // Get All newly onboarded Admins
const GetAllAdmins = async (req, res) => {
  const query = req.query.new
  try 
  {
    const users = query
    ? await Admin.find().sort({ _id: -1}).limit(1) : await User.find();
    res.status(200).json(users);
  } catch (err)
  {
     if(err) res.status(500).json({status: 500, msg: err.message})
  }
}
// Delete Admin
    const deleteAdmin = async (req, res) => {
      try 
      {
        await Admin.findByIdAndDelete(req.params.id).then((data)=>{
          if(data) return res.status(200).json({status: 200, message: "Deletion was successfull"})
          res.status(400).json({status: "error", msg: "Deletion was not successfull"})
        })
      } catch (err)
      {
         if(err) res.status(500).json({status: 500, msg: err.message})
      }
  }
  // Update Admin

  const updateAdmin = async (req, res) => {
     try 
     {
    const update =    await Admin.findByIdAndUpdate(req.params.id, {
        $set: req.body,
       },
       {new: true}
       )
       res.status(200).json(update)
     } catch (err) 
     {
      if(err) res.status(500).json({status: 500, msg: err.message})

      }
  }
  // Get Admin Stats
  const GetStats = async(req, res) =>{
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
    try 
    {
        const dataAggregate = awaitAdmin.aggregate([
          { $match: { createdAt: { $gte: lastYear } }},
          {
            $project : {
               month: { month: "$createdAt"}
            }
          }, 
          {
             $group : {
              _id: "$month",
              total: { $sum : 1 }
             }
          }
        ])
        res.status(200).json(dataAggregate)

    } catch(err) 
    {
      if(err) res.status(500).json({status: 500, msg: err.message})
    }
  }
    
module.exports = {
    adminProfile,
    register,
    login,
    deleteAdmin,
    GetAllAdmins,
    updateAdmin,
    GetStats
  }