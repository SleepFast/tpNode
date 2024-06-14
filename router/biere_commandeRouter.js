const controller = require("../controller/biere_commandeController")

const express = require('express')
const router = express.Router()


router.post("/commandes/:id/biere/:id_biere", controller.addBiereToCommande)
router.delete("/commandes/:id/biere/:id_biere", controller.removeBiereFromCommande)
// POST /commandes/:id/biere/:id => Ajouter une bière à une commande
// DELETE /commandes/:id/biere/:id => Supprimer une bière d'une commande
module.exports = router