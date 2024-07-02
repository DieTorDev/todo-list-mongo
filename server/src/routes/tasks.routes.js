const express = require('express');
const tasksController = require('../controllers/tasks.controller');
const tasksRoutes = express.Router();

tasksRoutes.get('/', tasksController.getAllTasks);
tasksRoutes.post('/', tasksController.createTask);
tasksRoutes.patch('/:id', tasksController.updateTask);
tasksRoutes.delete('/:id', tasksController.deleteTask);

module.exports = tasksRoutes;
