const express= require('express')
const middleware = express()

middleware.use((req,res) => res.sendFile("404.html", { root : "./public/"}))

module.exports = middleware
