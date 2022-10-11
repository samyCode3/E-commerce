const express = require('express')
const ejs = require('ejs')
const mongoose = require("mongoose")
const path = require('path')
const router = require('./router/pages')
const UserAuth = require("./controllers/user.controller")
const AdminAuth = require("./controllers/admin.controller")
const StoreController = require("./controllers/store.controller")
const productController = require("./controllers/product.controller")
const PushSystem = require("./controllers/notification.controller")
const Mycarts = require("./controllers/carts.controller")
const order = require("./controllers/order.controller")
const app = express()
const cookie = require("cookie-parser")
const db = require("./config/dbConfig").MongoURL
const authRouter = require("./middleware/auth.middleware")



const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cookie())
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, "public")));


mongoose.Promise = global.Promise

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("connected to mongo database"))
    .catch(err => console.log(err))

app.use("/", router)
app.use('/api/user', UserAuth)
app.use('/api/admin', AdminAuth)
app.use("/api/admin", StoreController)
app.use("/api/admin", productController)
app.use("/api", Mycarts)
app.use("/api", order)
app.use("/", PushSystem)




app.listen(PORT, (err) => {
    if (err) throw err
    console.log(`Server is running on port ${PORT}`)

})



