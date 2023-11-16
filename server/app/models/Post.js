const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  userId: String
});

const taskSchema = new mongoose.Schema({
  userId:String,
  imageUrl:String,
  title: String,
  description: String,
  likes:[likeSchema],
  likesCount:Number
});

module.exports = mongoose.model('Task', taskSchema);
