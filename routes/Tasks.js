const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/TaskController')

router.post('/create', TaskController.create)
router.get('/', TaskController.getAll)
router.get('/getAll', TaskController.getALLSSR)
router.get('/id/:_id', TaskController.getByID)
router.delete('/id/:_id', TaskController.deleteTask)
router.put('/markascompleted/:_id', TaskController.updateCompleted)
router.post('/createNewProduct', TaskController.createTask)
router.post('id/:id', TaskController.editSSR)
router.delete('id/:id/delete', TaskController.deleteTask)

module.exports = router