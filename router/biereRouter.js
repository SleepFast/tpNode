const controller = require("../controller/biereController")

const express = require('express')
const router = express.Router()

router.get("/biere/:id", controller.getById)
router.put("/biere/:id", controller.update)
router.delete("/biere/:id", controller.delete)

module.exports = router