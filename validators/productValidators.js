
const ensureHaveId = (req, res, next) => {
  req.params.id = parseInt(req.params.id);

  if (isNaN(req.params.id)) {
    return res.send({ errors: { id: "Must be an integer" } })
  }
  next()
}

const ensureHaveProductBody = (req, res, next) => {

  const { name, price, description, quantity } = req.body
  const errors = {}

  if (name === undefined) {
    errors.name = "Name must be filled"
  }

  if (price === undefined || !isFloat(price)) {
    errors.price = "Price must be filled"
  }

  if (description === undefined) {
    errors.description = "description must be filled"
  }

  if (quantity === undefined || isNaN(quantity)) {
    errors.quantity = "quantity must be filled"
  }

  if (Object.keys(errors).length > 0) {
    return res.send(errors)
  }

  req.product = {name, price, description, quantity}
  next()
}



function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}

module.exports = { ensureHaveId, ensureHaveProductBody }