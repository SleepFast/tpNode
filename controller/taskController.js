const controller = {}

const Task = require('../model/Task')

let tasks = []


controller.getAll = (req, res) => {
  Task.findAll().then((tasks) => {
    res.send(tasks)
  }).catch((err) => {
    res.send({message : "Find all failed"})
  })
}

controller.getById = (req, res) => {
  const id = req.params.id
  Task.find(id).then( (p) => {
    res.send(p)
  }).catch((err) => {
    res.send({message : "Task not found"})
  })
}

controller.create = (req, res) => {
  const {title, content, status} = req.body
  const task = { title, content, status }
  tasks.push(task)

  res.send({task : task, message: "task created"})
}

controller.update = (req, res) => {
  const id = req.params.id
  const {title, content, status} = req.body
  const task = { title, content, status }

  if (tasks[id] === undefined ){
    return res.send("Task not found")
  }
  
  tasks[id] = task
  res.send({task : task, message: "task updated !" })
}

controller.delete = (req, res) => {
  const id = req.params.id
  if (tasks[id] === undefined ){
    return res.send("Task not found")
  }
  tasks.splice(id, 1)
  res.send({message : "task deleted !"})
}

module.exports = controller