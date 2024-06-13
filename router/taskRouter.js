const controller = require("../controller/taskController")

const express = require('express')
const router = express.Router()

router.get("/task", controller.getAll)
router.get("/task/:id", controller.getById)
router.post("/task", controller.create)
router.put("/task/:id", controller.update)
router.delete("/task/:id", controller.delete)


module.exports = router