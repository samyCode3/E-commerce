const express = require("express")
const Service = require("../services/product.service")
const auth    = require("../middleware/auth.middleware")
const authAdmin = require("../middleware/admin.auth")
const router = express()

router.post("/createproduct",authAdmin.AuthenticateAdmin, Service.PostProduct) //only admin
router.get("/Getproduct/:id", Service.GetProduct)
router.get("/findproduct", Service.GetAvailableProduct)
router.put("/updateproduct/:id", authAdmin.AuthenticateAdmin, Service.UpdateProduct) // only admin
router.delete("/deleteproduct/:id", authAdmin.AuthenticateAdmin, Service.DeleteProduct) // only admin
module.exports = router
