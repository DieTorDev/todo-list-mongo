const mongoose = require('mongoose');
const TaskScheme = require('../schemes/task.scheme');

const TaskModel = mongoose.model('Tasks', TaskScheme, 'tasks');

module.exports = TaskModel;
