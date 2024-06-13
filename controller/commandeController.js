const controller = {};

const Commande = require("../models/Commande");

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
