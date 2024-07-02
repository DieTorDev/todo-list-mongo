const mongoose = require('mongoose');

const TaskScheme = mongoose.Schema({
  _id: String,
  task: String,
  completed: Boolean
});

module.exports = TaskScheme;
