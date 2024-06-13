const controller = require("../controller/commandeController")

const express = require('express')
const router = express.Router()

router.get("/commande/:id", controller.getById)
router.put("/commande/:id", controller.update)
router.delete("/commande/:id", controller.delete)


module.exports = router