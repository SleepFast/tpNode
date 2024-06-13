require('dotenv').config();
const express = require("express")
const bodyParser = require('body-parser')
const app = express()

const PORT = process.env.SERVER_PORT || 3001


const userRouter = require("./router/userRouter")
const taskRouter = require("./router/taskRouter")


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(userRouter)
app.use(taskRouter)

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










