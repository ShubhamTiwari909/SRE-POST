const User = require('../models/User');

// Create a new task
const createUser = async (req, res) => {
  try {
    const { email } = req.body
    const user = new User(req.body);
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      // If a user with the same email exists, return an error response
      await user.save();
      res.status(201).json(user);
    }
    else {
      res.json({message:"User already exist",userExist:true})
    }

  } catch (err) {
    res.status(400).json({ message: "User not created" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email } = req.body
    const user = new User(req.body);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // If a user with the same email exists, return an error response
      res.status(201).json({...user,message:`Welcome ${req.body.name}`,userExist:true});
    }
    else {
      res.json({message:"User doesn't exist",userExist:false})
    }

  } catch (err) {
    res.status(400).json({ message: "User not created" });
  }
};

module.exports = { createUser,loginUser };
