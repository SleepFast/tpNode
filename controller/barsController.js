const Bars = require("../models/Bars");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../auth/auth");

const controller = {};

controller.getById = (req, res) => {
	Bars.findByPk(req.params.id).then((bars) => {
		res.send({ bars })
	}).catch((err) => {
		res.send({ message: "Bars not found", err })
	})
}

controller.getAll = (req, res) => {
	Bars.findAll().then((bars) => {
		res.status(200).send(bars)
	}).catch((err) => {
		res.status(503).send({ message: "Find all failed" })
	})
}

// Register a new bars
controller.register = async (req, res) => {
	const { name, adresse, tel, description, email, password } = req.body;

	const hashedPassword = await bcrypt.hash(password, 10);
	const bars = { name, adresse, tel, description, email, password: hashedPassword };

	Bars.create(bars)
		.then((bars) => {
			const token = generateToken(bars);

			res.cookie('jwt', token, {
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
	const bars = { name, adresse, tel, description, email, password: hashedPassword };

	Bars.update(bars, { where: { id } })
		.then((updateCount) => {
			if (updateCount[0] === 0) return res.status(401).send({ message: "Bar not found" })
			return res.send({ message: "bars updated !" });	
		}).catch((err) => {
			return res.status(401).send({ message: "Error updating bars", err })
		})

};

controller.delete = (req, res) => {
	const id = req.params.id;

	Bars.destroy({ where: { id } })
		.then((deleteCount) => {
			if (deleteCount === 0) return res.status(401).send({ message: "Cannot delete bar, bar not found" })
			return res.send({ message: "Bar deleted !" });
		})
};

// Login bars
controller.login = async (req, res) => {
	const { email, password } = req.body;
	const bars = await Bars.findOne({ where: { email } });

	if (!bars || !(await bcrypt.compare(password, bars.password))) {
		return res.status(401).json({ error: "Invalid email or password" });
	}

	const token = generateToken(bars);

	res.cookie('jwt', token, {
		httpOnly: true,
		maxAge: 3600000,
	});

	res.json({ message: "Login successful" });
};

module.exports = controller;
