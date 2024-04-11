const mongoose = require('mongoose')

const Taskschema = new mongoose.Schema(
    {
        nombre: String, 
        descripcion: String,
        categoria: String, 
        talla: String, 
        precio: Number
    }, {timestamps: true}
)

const Task = mongoose.model('Task', Taskschema)

module.exports = Task