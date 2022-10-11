const express = require("express")
const router = express()
const auth = require("../middleware/auth.middleware")
const store = require("../services/store.service")
const authAdmin = require("../middleware/admin.auth")

router.post("/createstore/:id",auth.upload.single('avater'), auth.AuthenticateUser, store.createStore) // only admin
router.put("/store/:id", authAdmin.AuthenticateAdmin, store.UpdateStore) // only admin
router.delete("/delete/:id", authAdmin.AuthenticateAdmin, store.deleteStore) // only admin
router.get("/store", auth.AuthenticateUser, store.GetStores)
router.get("/store/:id", auth.AuthenticateUser, store.GetStoreById)


module.exports = router