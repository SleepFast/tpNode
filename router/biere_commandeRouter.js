const controller = require("../controller/biere_commandeController")

const express = require('express')
const router = express.Router()

router.post("/commandes/:id/biere/:id_biere", controller.addBiereToCommande)
router.delete("/commandes/:id/biere/:id_biere", controller.removeBiereFromCommande)

module.exports = router