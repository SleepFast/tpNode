const controller = {};

const Commande = require("../models/Commande");

controller.getCommandeForBar = (req, res) => {
  const id = req.params.id_bar;

  Commande.findAll({ where: { barsId: id } })
    .then((b) => {
      if (!b) {
        return res.status(200).send({ message: "Commande not found for this bar" });
      }
      return res.status(200).send(b);
    })
    .catch((err) => {
      res.status(400).send({ message: "Commande not found" });
    });
};

controller.create = (req, res) => {
  const barsId = req.params.barsId
  const { name, prix, date } = req.body;

	const commande = { name, prix, date, status: "en cours", barsId };

  Commande.create(commande)
		.then((commande) => {
			return res.status(201).send({ commande: commande, message: "commande created" });
		})
		.catch((err) => {
			return res
				.status(400)
				.send({ message: "Error creating commande", error: err.errors });
		});
}

controller.getAll = (req, res) => {
  Commande.findAll()
    .then((commandes) => {
      res.status(200).send(commandes);
    })
    .catch((err) => {
      res.status(503).send({ message: "Find all failed" });
    });
};

controller.getById = (req, res) => {
  const id = req.params.id;
  Commande.findByPk(id)
    .then((b) => {
      if (!b) {
        return res.status(200).send({ message: "Commande not found" });
      }
      res.send(b);
    })
    .catch((err) => {
      res.status(400).send({ message: "Commande not found" });
    });
};

controller.update = async (req, res) => {
  const id_commande = req.params.id_commande;
  const { name, prix, date, status, barsId } = req.body;
  const commande = { name, prix, date, status, barsId };

  try {
    const existingCommande = await Commande.findOne({ where: { id: id_commande } });

    if (!existingCommande) {
      return res.status(404).send({ message: "Commande not found" });
    }

    if (existingCommande.status === "terminée") {
      return res.status(400).send({ message: "Cannot update a completed Commande" });
    }

    const queryResult = await Commande.update(commande, { where: { id: id_commande } });
    
    res.status(200).send({ message: "Commande updated", result: queryResult });
  } catch (error) {
    res.status(400).send({ message: "Commande not updated", error });
  }
};

controller.delete = (req, res) => {
  const id = req.params.id_commande;

  Commande.destroy({ where: { id: id } })
    .then((queryResult) => {
      if (queryResult === 0) return res.status(400).send("Commande not found");

      res.status(200).send({ message: "Commande deleted !", result: queryResult });
    })
    .catch((error) => {
      res.status(400).send({ message: "Commande not deleted", error });
    });
};

module.exports = controller;
