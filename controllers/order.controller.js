const  express = require("express")
const router = express()
const auth = require("../middleware/auth.middleware")
const order = require("../services/order.services")
const authAdmin = require("../middleware/admin.auth")
router.post("/orders", auth.AuthenticateUser,order.PostOrder)
router.get("/orders/incomes", authAdmin.AuthenticateAdmin, order.Incomes)
router.get("/orders", authAdmin.AuthenticateAdmin, order.GetAvailableOrder) //only admin
router.put("/orders/update", authAdmin.AuthenticateAdmin, order.UpdatedOrder) // Only Admin
router.delete("/orders/delete", auth.AuthenticateUser, order.DeleteOrder)
module.exports = router