
// const controller = {}

// const Product = require('../model/Product')

// let products = []


// controller.getAll = (req, res) => {
//   Product.findAll().then((products) => {
//     res.status(200).send(products)
//   }).catch((err) => {
//     res.status(503).send({message : "Find all failed"})
//   })
// }

// controller.getById = (req, res) => {
//   const id = req.params.id
//   Product.findByPk(id).then( (p) => {
//     if (!p) {
//       return res.status(200).send({message : "Product not found"})
//     }
//     res.send(p)
//   }).catch((err) => {
//     res.status(400).send({message : "Product not found"})
//   })
// }

// controller.create = (req, res) => {

//   const { name, price, description, quantity } = req.body
//   const product = {name, price, description, quantity}

//   Product.create(product)
//   .then( (p) => {
//     return res.status(201).send({product : p, message: "product created"})
//   } )
//   .catch( (err) => {
//     return res.status(400).send({message: "Error creating product", error : err.errors})
//   })
// }

// controller.update = (req, res) => {
//   const id = req.params.id
//   const { name, price, description, quantity } = req.body
//   const product = {name, price, description, quantity}

//   Product.update(product, { where : { id : id}}).then( (queryResult) => {
//     res.status(200).send({message: "Product updated" , result : queryResult })
//   }).catch( (error) => {
//     res.status(400).send({message : "Product not updated", error})
//   })
// }

// controller.delete = (req, res) => {
//   const id = req.params.id

//   Product.destroy({ where : { id : id}}).then((queryResult) => {
//     if (queryResult === 0) return res.status(400).send('Product not found')
      
//     res.status(200).send({message : "Product deleted !", result : queryResult})
//   }).catch( error => {
//     res.status(400).send({message : "Product not deleted", error})
//   })
// }

// module.exports = controller



