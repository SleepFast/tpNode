const controller = {};

const Biere = require("../models/Biere");
const Commande = require("../models/Commande");
const Biere_commande = require("../models/Biere_commande");

controller.getAll = (req, res) => {
  Biere.findAll()
    .then((bieres) => {
      res.status(200).send(bieres);
    })
    .catch((err) => {
      res.status(503).send({ message: "Find all failed" });
    });
};

controller.getById = (req, res) => {
  const id = req.params.id;
  Biere.findByPk(id)
    .then((b) => {
      if (!b) {
        return res.status(200).send({ message: "Biere not found" });
      }
      res.send(b);
    })
    .catch((err) => {
      res.status(400).send({ message: "Biere not found" });
    });
};

controller.getBiereForBar = (req, res) => {
  const id = req.params.id;

  Biere.findAll({ where: { barsId: id } })
    .then((b) => {
      if (!b) {
        return res.status(200).send({ message: "Biere not found" });
      }
      return res.status(200).send(b);
    })
    .catch((err) => {
      res.status(400).send({ message: "Biere not found" });
    });
};

controller.create = (req, res) => {
  const barsId = req.params.id;
  const { name, description, degree, prix } = req.body;
  const biere = { name, description, degree, prix, barsId };

  Biere.create(biere)
    .then((biere) => {
      return res.status(201).send({ biere, message: "Biere created" });
    })
    .catch((err) => {
      return res
        .status(400)
        .send({ message: "Error creating biere", error: err.errors });
    });
<<<<<<< HEAD
}
=======
};
>>>>>>> tomtom4

controller.update = (req, res) => {
  const id = req.params.id;
  const { name, description, degree, prix, bars_id } = req.body;
  const biere = { name, description, degree, prix, bars_id };

  Biere.update(biere, { where: { id: id } })
    .then((queryResult) => {
      res.status(200).send({ message: "Biere updated", result: queryResult });
    })
    .catch((error) => {
      res.status(400).send({ message: "Biere not updated", error });
    });
};

controller.delete = async (req, res) => {
  const id = req.params.id;

  const biereCommandes = await Biere_commande.findAll({where: { biere_id: id }});

  await Commande.destroy({ where: { id: biereCommandes.map(bc => bc.commande_id) }});

  Biere.destroy({ where: { id: id } })
    .then((queryResult) => {
      if (queryResult === 0) return res.status(400).send("Biere not found");

      res.status(200).send({ message: "Biere deleted !", result: queryResult });
    })
    .catch((error) => {
      res.status(400).send({ message: "Biere not deleted", error });
    });
};

module.exports = controller;
