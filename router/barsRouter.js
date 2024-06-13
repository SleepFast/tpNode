const controller = require("../controller/barsController")

const express = require('express')
const router = express.Router()

router.post("/login", controller.login)
router.post("/bars", controller.register)
router.put("/bars/:id", controller.update)
router.delete("/bars/:id", controller.delete)
router.get("/bars", controller.getAll)
router.get("/bars/:id", controller.getById)


module.exports = router