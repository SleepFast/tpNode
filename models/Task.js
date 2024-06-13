const db = require('../config/db')
const { DataTypes } = require('@sequelize/core')
const User = require('./User')

const Task = db.define('Task', {
  id : { type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true },
  title : {
    type :DataTypes.STRING,
    allowNull : false,
    validate: {
      notNull : true,
      notEmpty : true,
      len: [3, 255],
    }
  }, 
  content : { 
    type : DataTypes.STRING,
    allowNull : false,
    validate: {
      notNull : true,
      notEmpty : true,
      len: [3, 255],
    }
  }, 
  status : { 
    type : DataTypes.ENUM('BACKLOG', 'TODO', 'IN PROGRESS', 'DONE'),
    allowNull : false,
    validate: {
      notNull : true,
      notEmpty : true,
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User, // Nom de la table Users
      key: 'id',
    },
    onDelete: 'CASCADE',
    allowNull: false,
  }
})

User.hasMany(Task, { foreignKey: 'userId', as: 'tasks' });
Task.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Task