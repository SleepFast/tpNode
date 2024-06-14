const controller = require("../controller/commandeController")

const express = require('express')
const router = express.Router()

router.get("/commande/:id", controller.getById)
router.get("/bars/:id_bar/commandes", controller.getCommandeForBar)
router.put("/commande/:id_commande", controller.update)
router.delete("/commande/:id_commande", controller.delete)
router.post("/bars/:barsId/commandes", controller.create)


module.exports = router