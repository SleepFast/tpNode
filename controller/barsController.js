const { Op } = require('sequelize');
const bcrypt = require("bcryptjs");
const { generateToken } = require("../middleware/auth");
const Bars = require("../models/Bars");
const Commande = require("../models/Commande");
const Biere = require("../models/Biere");

const controller = {};

controller.getById = (req, res) => {
  Bars.findByPk(req.params.id)
    .then((bars) => {
      res.send({ bars });
    })
    .catch((err) => {
      res.send({ message: "Bars not found", err });
    });
};

controller.getAll = async (req, res) => {
  const query = req.query
  if (query) {
    let condition = {}

    if (Object.keys(query)[0].toLocaleLowerCase() == "name") {
      const { name } = query
      condition = {
        name: {
          [Op.like]: `%${name}%`
        }
      };
      try {
        const bars = await Bars.findAll({ where: condition })
        if (bars.length === 0) {
          return res.status(200).send({ bars, message: "No Bars found with the name " + name })
        }
        return res.status(200).json({ bars });
      } catch (e) {
        return res.status(400).send({ message: "Error with when trying to retrieve bar with specific name", err: e })
      }
    }

    if (Object.keys(query)[0].toLocaleLowerCase() == "ville") {
      const { ville } = query
      condition = {
        adresse: {
          [Op.like]: `%${ville}%`
        }
      };

      try {
        const bars = await Bars.findAll({ where: condition })
        if (bars.length === 0) {
          return res.status(200).send({ bars, message: "No Bars found in the city " + ville })
        }
        return res.status(200).json({ bars });
      } catch (e) {
        return res.status(400).send({ message: "Error with when trying to retrieve bar for a city", err: e })
      }
    }
  }

  return Bars.findAll()
    .then((bars) => {
      res.status(200).send(bars);
    })
    .catch((err) => {
      res.status(503).send({ message: "Find all failed" });
    });
};

// Register a new bars
controller.register = async (req, res) => {
  const { name, adresse, tel, description, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const bars = {
    name,
    adresse,
    tel,
    description,
    email,
    password: hashedPassword,
  };

  Bars.create(bars)
    .then((bars) => {
      const token = generateToken(bars);

      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3600000,
      });

      return res.status(201).send({ bars: bars, message: "bars created" });
    })
    .catch((err) => {
      return res
        .status(400)
        .send({ message: "Error creating bars", error: err.errors });
    });
};

controller.update = async (req, res) => {
  const id = req.params.id;
  const { name, adresse, tel, description, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const bars = {
    name,
    adresse,
    tel,
    description,
    email,
    password: hashedPassword,
  };

  Bars.update(bars, { where: { id } })
    .then((updateCount) => {
      if (updateCount[0] === 0)
        return res.status(401).send({ message: "Bar not found" });
      return res.send({ message: "bars updated !" });
    })
    .catch((err) => {
      return res.status(401).send({ message: "Error updating bars", err });
    });
};

controller.delete = async (req, res) => {
  const id = req.params.id;

  // Find the Bar by id
  const bar = await Bars.findByPk(id);

  if (!bar) {
    return res.status(404).send({ message: "Bar not found" });
  }

  await Commande.destroy({ where: { barsId: id } });

  await Biere.destroy({ where: { barsId: id } });

  // Delete the Bar
  await bar.destroy();

  res
    .status(200)
    .send({ message: "Bar and associated records deleted successfully" });
};

// Login bars
controller.login = async (req, res) => {
  const { email, password } = req.body;
  const bars = await Bars.findOne({ where: { email } });

  if (!bars || !(await bcrypt.compare(password, bars.password))) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = generateToken(bars);

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 3600000,
  });

  res.json({ message: "Login successful" });
};

module.exports = controller;
