const express = require("express")
const router = express()
const PushNotify = require("../pushNotification/push.services")

router.post('/subscribe', PushNotify.PushNotification)
module.exports = router