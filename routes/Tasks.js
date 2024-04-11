const express = require('express')
const router = express.Router()
const Task = require('../models/Task')
const TaskController = require('../controllers/TaskController')

router.post('/create', TaskController.create)
router.get('/', TaskController.getAll)
router.get('/getAll', TaskController.getALLSSR)

module.exports = router