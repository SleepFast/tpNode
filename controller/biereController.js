const controller = {};
const { Op } = require("sequelize");

const { Op } = require('sequelize');
const Bars = require('../models/Bars');
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

controller.getBiereDegreeForBar = async (req, res) => {
  const id = req.params.id_bar;
  let moyenneDegree = 0;
  const date = req.query.date;
  const prix_min = req.query.prix_min;
  const prix_max = req.query.prix_max;
  const status = req.query.status;

  if (new Date(date) instanceof Date && !isNaN(new Date(date))) {
    const myDate = new Date(date);
    const myTomorrowDate = new Date(date).setDate(myDate.getDate() + 1);

    try {
      const commandes = await Commande.findAll({
        where: {
          barsId: id,
          date: {
            [Op.gte]: myDate,
            [Op.lt]: myTomorrowDate,
          },
          status: status || "",
        },
      });

      const commandeIds = commandes.map((commande) => commande.id);

      // Step 2: Find Biere_commande records for the found Commande IDs
      const biereCommandes = await Biere_commande.findAll({
        where: {
          commande_id: commandeIds,
        },
      });

      const biereCommandesIds = biereCommandes.map(
        (bierecommande) => bierecommande.biere_id
      );

      let biereFromCommandes;
      if (!!prix_min && !!prix_max) {
        biereFromCommandes = await Biere.findAll({
          where: {
            id: biereCommandesIds,
            prix: {
              [Op.gte]: prix_min,
              [Op.lt]: prix_max,
            },
          },
        });
      } else {
        biereFromCommandes = await Biere.findAll({
          where: {
            id: biereCommandesIds,
          },
        });
      }
      // Calculate average alcohol degree
      let totalDegree = 0;
      let beerCount = 0;

      biereFromCommandes.map((biereFromCommande) => {
        totalDegree += biereFromCommande.degree;
        beerCount++;
      });

      const averageDegree = totalDegree / beerCount;

      console.log(`POUET`, averageDegree);
      return res.status(200).send({ averageDegree });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error retrieving average beer degree" });
    }
  }

  if (!!prix_min && !!prix_max) {
    return Biere.findAll({
      where: {
        barsId: id,
        prix: {
          [Op.gte]: prix_min,
          [Op.lt]: prix_max,
        },
      },
    })
      .then((bieres) => {
        bieres.map((biere) => {
          moyenneDegree = biere.degree + moyenneDegree;
        });

        moyenneDegree = moyenneDegree / bieres.length;

        return res.status(200).send(moyenneDegree);
      })
      .catch((err) => {
        return res
          .status(503)
          .send({ message: "Error retrieving biere degree average by price" });
      });
  }

  Biere.findAll({ where: { barsId: id } })
    .then((bieres) => {
      bieres.map((biere) => {
        moyenneDegree = biere.degree + moyenneDegree;
      });

      moyenneDegree = moyenneDegree / bieres.length;

<<<<<<< HEAD
      res.status(200).send({ moyenneDegree });
=======
      return res.status(200).send({ moyenneDegree });
>>>>>>> tomtom5
    })
    .catch((err) => {
      res
        .status(503)
        .send({ message: "Find average degree with id bar failed" });
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

controller.getBiereForBar = async (req, res) => {
  const id = req.params.id;
  let { sort, limit, offset, degree_max, prix_min, prix_max } = req.query;

  if (sort && (sort.toLowerCase() === "asc" || sort.toLowerCase() === "desc")) {
    sort = sort.toLowerCase();
    orderOption = [['name', `${sort}`]];

    let conditions = undefined;
    if (degree_max) {
      conditions = {
        degree: {
          [Op.lte]: degree_max
        }
      };
    }

    if(prix_min && prix_max) {
      conditions["prix"] = {
        [Op.gte]: prix_min,
        [Op.lte]: prix_max
      }
    }

    const bieres = await Biere.findAll({
      where: conditions,
      order: orderOption,
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined
    });

    return res.status(200).send({ bieres });
  }


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
};

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

<<<<<<< HEAD
  const biereCommandes = await Biere_commande.findAll({ where: { biere_id: id } });

  await Commande.destroy({ where: { id: biereCommandes.map(bc => bc.commande_id) } });
=======
  const biereCommandes = await Biere_commande.findAll({
    where: { biere_id: id },
  });

  await Commande.destroy({
    where: { id: biereCommandes.map((bc) => bc.commande_id) },
  });
>>>>>>> tomtom5

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
