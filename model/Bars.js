const db = require('../config/db')
const { DataTypes } = require('@sequelize/core')

const Bars = db.define('Bars', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
		validate: {
			notNull: true,
			notEmpty: true,
			len: [2, 255],
		}
	},
	adresse: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notNull: true,
			notEmpty: true,
			len: [3, 255],
		}
	},
	tel: {
		type: DataTypes.STRING,
		allowNull: true,
		validate: {
			len: 10,
		}
	},
	description: {
		type: DataTypes.STRING,
		allowNull: true,
		validate: {
			len: [3, 255],
		}
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate: {
			notNull: true,
			notEmpty: true,
			len: [3, 255],
		}
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notNull: true,
			notEmpty: true,
			len: [3, 255],
		}
	},
})

module.exports = Bars