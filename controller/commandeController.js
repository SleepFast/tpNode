const controller = {};

const Commande = require("../models/Commande");

// POST /bars/:id_bar/commandes => Ajouter une commande à un bar 

// PUT /commandes/:id_commande => Modifier une commande d'un bar

// DELETE /commandes/:id_commande => Supprimer une commande d'un bar

// GET /bars/:id_bar/commandes => Liste des commandes d'un bar

// GET /commandes/:id => Détail d'une commande d'un bar

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

controller.update = (req, res) => {
  const id = req.params.id;
  const { name, prix, date, status, bars_id } = req.body;
  const commande = { name, prix, date, status, bars_id };

  Commande.update(commande, { where: { id: id } })
    .then((queryResult) => {
      res.status(200).send({ message: "Commande updated", result: queryResult });
    })
    .catch((error) => {
      res.status(400).send({ message: "Commande not updated", error });
    });
};

controller.delete = (req, res) => {
  const id = req.params.id;

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
