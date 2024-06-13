// const db = require('../config/db')
// const { DataTypes } = require('@sequelize/core')

// const Product = db.define('Product', {
//   id : { type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true },
//   name : {
//     type :DataTypes.STRING,
//     allowNull : false,
//     validate: {
//       notNull : true,
//       notEmpty : true,
//       len: [3, 255],
//     }
//   }, 
//   price : { 
//     type : DataTypes.FLOAT,
//     allowNull : false,
//     validate: {
//       notNull : true,
//       notEmpty : true,
//       isFloat : true,
//       min: 0
//     }
//   }, 
//   description : { 
//     type : DataTypes.STRING,
//     allowNull : false,
//     validate: {
//       notNull : true,
//       notEmpty : true,
//     }
//   },  
//   quantity: { 
//     type : DataTypes.INTEGER,
//     allowNull : false,
//     validate: {
//       notNull : true,
//       notEmpty : true,
//       isInt : true,
//       min: 0
//     }
//   }
// })

// module.exports = Product