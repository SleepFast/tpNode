const controller = require("../controller/userController")

const express = require('express')
const router = express.Router()

router.get("/user/:id", controller.getById)
router.put("/user/:id", controller.update)
router.delete("/user/:id", controller.delete)
router.post("/register", controller.register)
router.post("/login", controller.login)


module.exports = router