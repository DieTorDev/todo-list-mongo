const { v4 } = require('uuid');
const TaskModel = require('../models/task.model');

const tasksController = {};

// Obtener todas las tareas
tasksController.getAllTasks = async (req, res) => {
  try {
    const allTasks = await TaskModel.find();
    res.send(allTasks);
  } catch (err) {
    console.error(err);
  }
};

tasksController.createTask = async (req, res) => {
  try {
    const newTask = new TaskModel({
      _id: v4(),
      task: req.body.task,
      completed: false
    });
    await newTask.save();

    const allTasks = await TaskModel.find();
    res.send(allTasks);
  } catch (err) {
    console.error(err);
  }
};

tasksController.updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    await TaskModel.updateOne({ _id: id }, { $set: { ...req.body } });

    const allTasks = await TaskModel.find();
    res.send(allTasks);
  } catch (err) {}
};

tasksController.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await TaskModel.deleteOne({ _id: id });

    const allTasks = await TaskModel.find();
    res.send(allTasks);
  } catch (err) {}
};

module.exports = tasksController;
