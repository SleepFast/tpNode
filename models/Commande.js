const db = require('../config/db')
const { DataTypes } = require('@sequelize/core')
const Bars = require('./Bars')

const Commande = db.define('Commande', {
  id : { type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true },
  name : {
    type :DataTypes.STRING,
    allowNull : false,
    validate: {
      notNull : true,
      notEmpty : true,
      len: [3, 255],
    }
  }, 
  prix : { 
    type : DataTypes.FLOAT,
    allowNull : false,
    validate: {
      notNull : true,
      notEmpty : true,
      min: 0,
    }
  }, 
  date : { 
    type : DataTypes.DATE,
    allowNull : false,
    validate: {
      notNull : true,
      notEmpty : true,
    }
  },  
  status: { 
    type: DataTypes.ENUM("en cours", "terminée"),
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      len: [3, 255],
    }
  },
  barsId: {
    type: DataTypes.INTEGER,
    references: {
      model: Bars,
      key: 'id',
    },
    onDelete: 'CASCADE',
    allowNull: false,
  }
})

module.exports = Commande