const bcrypt = require("bcryptjs")
const uuid = require("uuid")
const User = require("../../model/User")
const register = async(req, res) => {
 const {unique_id, name, username, email, password, password2} = req.body
 if(!name || !username || !email || !password) return res.json({ status : "error", error : "All field are required"})
 if(!/^[a-zA-Z ]*$/.test(name || username))return res.json({ status : "error", error: "Specail Character was entered.. Please Check your name or username"})
 if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))return res.json({ status : "error", error: "invaild email entered"})
 if(password.length < 8) return res.json({ status: "error", error: "Password should Atleat 8 characters"});
 if(/^[a-zA-Z0-9]*$/.test(password))return res.json({ status : "error", error: "Choose a stronger password"})
 if(password !== password2) return res.json({ status: "error", error: "Password confirmation fails.. please try again.."})
const passwordHash = await bcrypt.hash(password, 8);
User.findOne({email : email, username : username}).then(user => {
   if(user) return res.json({ status: "error", error: "Email or Username is taken"})
   const NewUser = new User({
      unique_id: uuid.v4(),
      name: name,
      username: username,
      email: email,
      password: passwordHash
   })
   NewUser.save().then(user => { return res.json( {status : "succes", success : `Your unique id is ${user.unique_id}`})})
   .catch(err => {if(err) return res.json({ status: "error", error : `${err}`})});
})

}

module.exports = register