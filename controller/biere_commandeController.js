const controller = {};
const Biere_commande = require("../models/Biere_commande");
const Biere = require("../models/Biere");
const Commande = require("../models/Commande");

controller.addBiereToCommande = (req, res) => {
    const commandId = req.params.id;
    const biereId = req.params.id_biere;

    Biere.findByPk(biereId).then(() => {
        Commande.findByPk(commandId).then(() => {
            const biereCommand = {
                biere_id: biereId,
                commande_id: commandId,
            }
            Biere_commande.create(biereCommand).then((biereCommand) => {
                res.status(201).send({ biereCommand, message: "Biere command created successfully" })
            }).catch((error) => {
                res.status(500).send({ message: "Error creating biere_command" })
            })
        }).catch((error) => {
            res.status(400).send({ message: "Command not found" })
        })
    }).catch((error) => {
        res.status(400).send({ message: "Biere not found" });
    })


}

controller.removeBiereFromCommande = (req, res) => {
    const commandId = req.params.id;
    const biereId = req.params.id_biere;

    Biere_commande.destroy({ where: { biere_id: biereId, commande_id: commandId } })
        .then((deleteCount) => {
            if (deleteCount === 0) return res.status(401).send({ message: "Cannot delete biere_command, biere_command not found" })
            return res.send({ message: "Biere_command deleted !" });
        })

}


module.exports = controller;
