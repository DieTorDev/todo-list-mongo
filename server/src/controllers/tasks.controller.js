const { v4 } = require('uuid');
const TaskModel = require('../models/task.model');

const tasksController = {};

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
    res.status(201).send(allTasks);
  } catch (err) {
    console.error(err);
    res.status(409).send(err);
  }
};

tasksController.updateTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await TaskModel.findById(id);

    if (!task) return res.status(409).send({ error: 'Task not found' });

    await TaskModel.updateOne({ _id: id }, { $set: { ...req.body } });

    const allTasks = await TaskModel.find();
    res.status(202).send(allTasks);
  } catch (err) {}
};

tasksController.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await TaskModel.findById(id);

    if (!task) return res.status(404).send({ error: 'Task not found' });

    await TaskModel.deleteOne({ _id: id });

    const allTasks = await TaskModel.find();
    res.status(202).send(allTasks);
  } catch (err) {}
};

module.exports = tasksController;
