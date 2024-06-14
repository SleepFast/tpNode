const controller = require("../controller/barsController")
const { verifyToken } = require("../middleware/auth")
const { loginValidationRules, validate } = require("../middleware/form")
const express = require('express')
const router = express.Router()

router.post("/login", loginValidationRules(), validate, controller.login)
router.post("/bars", controller.register)
router.put("/bars/:id", verifyToken, controller.update)
router.delete("/bars/:id", verifyToken, controller.delete)
router.get("/bars", controller.getAll)
router.get("/bars/:id", controller.getById)


module.exports = router