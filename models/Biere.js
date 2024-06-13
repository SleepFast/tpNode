const db = require('../config/db')
const { DataTypes } = require('@sequelize/core')
const Bars = require('./Bars')

const Biere = db.define('Biere', {
  id : { type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true },
  name : {
    type : DataTypes.STRING,
    allowNull : false,
    validate: {
      notNull : true,
      notEmpty : true,
      len: [3, 255],
    }
  }, 
  description : { 
    type : DataTypes.STRING,
    allowNull : true,
    validate: {
      notNull : false,
      notEmpty : false,
      len: [0, 255],
    }
  }, 
  degree : { 
    type : DataTypes.FLOAT,
    allowNull : false,
    validate: {
      notNull : true,
      notEmpty : true,
    }
  },  
  prix: { 
    type : DataTypes.FLOAT,
    allowNull : false,
    validate: {
      notNull : true,
      notEmpty : true,
      min: 0,
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


Bars.hasMany(Biere, { foreignKey: 'barsId', as: 'bieres' });
Biere.belongsTo(Bars, { foreignKey: 'barsId', as: 'bars' });


module.exports = Biere