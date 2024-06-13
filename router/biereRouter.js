const controller = require("../controller/biereController")

const express = require('express')
const router = express.Router()

router.post("/bars/:id/biere", controller.create)
router.get("/biere/:id", controller.getById)
router.put("/biere/:id", controller.update)
router.delete("/biere/:id", controller.delete)

module.exports = router
/**
  GET /bars/:id_bar/biere => Liste des bières d'un bar
 */