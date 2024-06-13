const db = require('../config/db')
const { DataTypes } = require('@sequelize/core')

const User = db.define('User', {
  id : { type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true },
  firstName : {
    type :DataTypes.STRING,
    allowNull : false,
    validate: {
      notNull : true,
      notEmpty : true,
      len: [3, 255],
    }
  }, 
  lastName : { 
    type : DataTypes.STRING,
    allowNull : false,
    validate: {
      notNull : true,
      notEmpty : true,
      len: [3, 255],
    }
  }, 
  password : { 
    type : DataTypes.STRING,
    allowNull : false,
    unique: true,
    validate: {
      notNull : true,
      notEmpty : true,
      len: [3, 255],
    }
  },  
  email: { 
    type : DataTypes.STRING,
    allowNull : false,
    unique: true,
    validate: {
      notNull : true,
      notEmpty : true,
      len: [3, 255],
    }
  }
})

module.exports = User