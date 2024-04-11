const Task = require('../models/Task')

const TaskController = {
    async create (req, res){
      try{
        const task = await Task.create({...req.body, completed: false})
        res.status(201).send(task)
      } catch(error){
        console.log(error)
     }
    },
    async getAll (req, res) {
      try{
       const task = await Task.find()
       res.json(task)
      } catch(error){
        console.log(error)
      }
    },
    async getALLSSR (req, res){
      try{
        const task = await Task.find()
        res.send(`<h1> Z-CLOTHES <h1>
            ${task.map(task => {
              return (`
               <div>
               <h2>${task.nombre}<h2>
               <p>${task.descripcion}<p>
               <p>${task.categoria}<p>
               <p>${task.talla}<p>
               <p>${task.precio}€<p>
               </div>`)
            }).join('')}
        `)
      } catch (error){
        console.log(error)
      }
    }
}

module.exports = TaskController