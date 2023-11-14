const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId:String,
  imageUrl:String,
  title: String,
  description: String,
});

module.exports = mongoose.model('Task', taskSchema);
