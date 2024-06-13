require('dotenv').config();
const express = require("express")
const bodyParser = require('body-parser')
const app = express()
const seed = require("./data/seed");

const PORT = process.env.SERVER_PORT || 3001

const barsRouter = require("./router/barsRouter")
const biereRouter = require("./router/biereRouter")
const commandeRouter = require("./router/commandeRouter")
const biere_commandeRouter = require("./router/biere_commandeRouter")


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(barsRouter)
app.use(biereRouter)
app.use(commandeRouter)
app.use(biere_commandeRouter)

function runApp() {
  app.listen(PORT, () => {
    console.log(`App started on port http://localhost:${PORT}`)
  })
}

seed(runApp)










