const mongoose = require('mongoose')

const Taskschema = new mongoose.Schema(
    {
        title: String, 
        completed: Boolean,
    }, {timestamps: true}
)

const Task = mongoose.model('Task', Taskschema)

module.exports = Task