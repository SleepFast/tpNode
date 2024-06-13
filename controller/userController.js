const controller = {};

const User = require("../model/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../auth/auth");

controller.getById = (req, res) => {
  const id = req.params.id;
  User.find(id)
    .then((p) => {
      res.send(p);
    })
    .catch((err) => {
      res.send({ message: "User not found" });
    });
};

controller.update = (req, res) => {
  const id = req.params.id;
  const { title, content, status } = req.body;
  const user = { title, content, status };

  if (users[id] === undefined) {
    return res.send("User not found");
  }

  users[id] = user;
  res.send({ user: user, message: "user updated !" });
};

controller.delete = (req, res) => {
  const id = req.params.id;
  if (users[id] === undefined) {
    return res.send("User not found");
  }
  users.splice(id, 1);
  res.send({ message: "user deleted !" });
};

// Register a new user
controller.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { email, firstName, lastName, password: hashedPassword };

  User.create(user)
    .then((user) => {
      const token = generateToken(user);

      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 3600000,
      });

      return res.status(201).send({ user: user, message: "user created" });
    })
    .catch((err) => {
      return res
        .status(400)
        .send({ message: "Error creating user", error: err.errors });
    });
};

// Login user
controller.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = generateToken(user);

  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 3600000,
  });

  res.json({ message: "Login successful" });
};

module.exports = controller;
