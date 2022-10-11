const express = require("express")
const Service = require("../services/category.service")
const auth    = require("../middleware/auth.middleware")
const router = express()

router.post("/create/category/:unique_id", auth.AuthenticateUser, Service.CreateCategory)
module.exports = router