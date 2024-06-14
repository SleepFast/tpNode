const controller = {};
const { ValidationError, Op } = require("sequelize");
const Commande = require("../models/Commande");

controller.getCommandeForBar = async (req, res) => {
  const id = req.params.id_bar;
  const date = req.query.date;
  const prix_min = req.query.prix_min;
  const prix_max = req.query.prix_max;
  const status = req.query.status;

  if (new Date(date) instanceof Date && !isNaN(new Date(date))) {
    const myDate = new Date(date);
    const myTomorrowDate = new Date(date).setDate(myDate.getDate() + 1);
    let where;

    if (!!prix_min && !!prix_max && !!status) {
      where = {
        where: {
          barsId: id,
          date: {
            [Op.gte]: myDate,
            [Op.lt]: myTomorrowDate,
          },
          prix: {
            [Op.gte]: prix_min,
            [Op.lt]: prix_max,
          },
          status: status,
        },
      };
    } else if (!!prix_min && !!prix_max) {
      where = {
        where: {
          barsId: id,
          date: {
            [Op.gte]: myDate,
            [Op.lt]: myTomorrowDate,
          },
          prix: {
            [Op.gte]: prix_min,
            [Op.lt]: prix_max,
          },
        },
      };
    } else {
      where = {
        where: {
          barsId: id,
          date: {
            [Op.gte]: myDate,
            [Op.lt]: myTomorrowDate,
          },
        },
      };
    }

    try {
      const commandes = await Commande.findAll(where);

      return res.status(200).send(commandes);
    } catch (error) {
      res.status(500).json({ error: "Error retrieving commandes by date" });
    }
  }

  if (!!prix_min && !!prix_max) {
    try {
      const commandes = await Commande.findAll({
        where: {
          barsId: id,
          prix: {
            [Op.gte]: prix_min,
            [Op.lt]: prix_max,
          },
        },
      });

      return res.status(200).send(commandes);
    } catch (error) {
      res.status(500).json({ error: "Error retrieving commandes by price" });
    }
  }

  Commande.findAll({ where: { barsId: id } })
    .then((b) => {
      if (!b) {
        return res
          .status(200)
          .send({ message: "Commande not found for this bar" });
      }
      return res.status(200).send(b);
    })
    .catch((err) => {
      res.status(400).send({ message: "Commande not found" });
    });
};

controller.create = (req, res) => {
  const barsId = req.params.barsId;
  const { name, prix, date } = req.body;

  const commande = { name, prix, date, status: "en cours", barsId };

  Commande.create(commande)
    .then((commande) => {
      return res
        .status(201)
        .send({ commande: commande, message: "commande created" });
    })
    .catch((err) => {
      if (err.errors[0].original instanceof ValidationError) {
        return res.status(400).send({
          error: err.errors[0].original.name,
          message: "Command date cannot be greater than today",
        });
      } else {
        return res.status(500).send({ error: "An unexpected error occurred" });
      }
    });
};

controller.getAll = (req, res) => {
  Commande.findAll()
    .then((commandes) => {
      res.status(201).send(commandes);
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
        return res.status(201).send({ message: "Commande not found" });
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
    const existingCommande = await Commande.findOne({
      where: { id: id_commande },
    });

    if (!existingCommande) {
      return res.status(404).send({ message: "Commande not found" });
    }

    if (existingCommande.status === "terminée") {
      return res
        .status(400)
        .send({ message: "Cannot update a completed Commande" });
    }

    const queryResult = await Commande.update(commande, {
      where: { id: id_commande },
    });

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

      res
        .status(201)
        .send({ message: "Commande deleted !", result: queryResult });
    })
    .catch((error) => {
      res.status(400).send({ message: "Commande not deleted", error });
    });
};

module.exports = controller;
