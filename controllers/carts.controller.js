const  express = require("express")

const router = express()
const auth = require("../middleware/auth.middleware")
const authAdmin = require("../middleware/admin.auth")
const cart = require("../services/cart.services")


router.post("/storecart", auth.AuthenticateUser, cart.PostCart)
router.get("/cart/:id", auth.AuthenticateUser, cart.GetCart)
router.get("/cart", authAdmin.AuthenticateAdmin, cart.GetAvailableCart) //only admin
router.put("/cart", authAdmin.AuthenticateAdmin, cart.UpdatedCart) // Only Admin
router.delete("/cart", auth.AuthenticateUser, cart.DeleteCart)

module.exports = router