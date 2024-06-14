const db = require('../config/db')
const { DataTypes } = require('@sequelize/core')
const Biere = require('./Biere')
const Commande = require('./Commande')

const Biere_commande = db.define('Biere_commande', {
  biere_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Biere,
      key: 'id',
    },
    onDelete: 'CASCADE'
  },
  commande_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Commande,
      key: 'id',
    },    
    onDelete: 'CASCADE',
  },
})

module.exports = Biere_commande