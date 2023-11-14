const Post = require('../models/Post');

// Create a new task
const createPost = async (req, res) => {
  try {
    const task = new Post(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read all tasks
const getPosts = async (req, res) => {
  const tasks = await Post.find();
  res.status(200).json(tasks);
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Post.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task', error: error.message });
  }
};

const getPostByUserEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await Post.find({"userId":id});

    res.status(200).json(tasks);

  } catch (error) {
    res.status(500).json({ message: 'Error fetching task', error: error.message });
  }
};


// Update a task by ID
const updatePost = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Post.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a task by ID
const deletePost = async (req, res) => {
  const { id } = req.params;
  const deletedPost = await Post.findById(id)
  res.status(201).json(deletedPost)
  await Post.findByIdAndRemove(id);
  res.status(204).end();
};

module.exports = { createPost, getPosts, getPostById, getPostByUserEmail, updatePost, deletePost };
