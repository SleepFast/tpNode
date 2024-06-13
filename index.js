require('dotenv').config();
const express = require("express")
const bodyParser = require('body-parser')
const app = express()

const PORT = process.env.SERVER_PORT || 3001


const biereRouter = require("./router/biereRouter")
const commandeRouter = require("./router/commandeRouter")
const biere_commandeRouter = require("./router/biere_commandeRouter")


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(biereRouter)
app.use(commandeRouter)
app.use(biere_commandeRouter)

app.listen(PORT, () => {
  console.log(`App started on port http://localhost:${PORT}`)
})



// const ensureHaveId = (req, res, next) => {
//   req.params.id = parseInt(req.params.id);

//   if (isNaN(req.params.id)){
//     return res.send({errors : { id: "Must be an integer"}})
//   }
//   next()
// }

// app.get("/hello/:id", ensureHaveId,  (req, res) => {
//   res.send(`Hello ${req.params.id}`)
// })










