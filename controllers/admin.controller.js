const express = require("express")
const router = express()
const authAdmin = require("../middleware/admin.auth")
const auth = require("../middleware/auth.middleware")
const Admin = require("../services/Admin")



router.post("/register", auth.upload.single('avater'),  Admin.register)
router.post("/login", Admin.login)
router.get("/", authAdmin.AuthenticateAdmin, Admin.adminProfile)
router.get("/Admins-registered",authAdmin.AuthenticateAdmin, Admin.GetAllAdmins)
router.delete("/delete/:id",authAdmin.AuthenticateAdmin, Admin.deleteAdmin)
router.put("/update/:id",authAdmin.AuthenticateAdmin, Admin.updateAdmin)
router.get("/stats",authAdmin.AuthenticateAdmin, Admin.GetStats)


module.exports = router