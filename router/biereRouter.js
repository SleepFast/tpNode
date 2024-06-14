const controller = require("../controller/biereController")

const express = require('express')
const router = express.Router()

router.post("/bars/:id/biere", controller.create)
router.get("/biere/:id", controller.getById)
router.get("/bars/:id/biere", controller.getBiereForBar)
router.get("/bars/:id_bar/degree", controller.getBiereDegreeForBar)
router.put("/biere/:id", controller.update)
router.delete("/biere/:id", controller.delete)


module.exports = router