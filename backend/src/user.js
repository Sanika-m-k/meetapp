const mongoose = require('mongoose');
const express =require('express');
const bcrypt = require('bcrypt');

const userRouter= express.Router();

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
  });
  
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

userRouter.post('/api/users', async (req, res) => {
    console.log('Connected');
    const { firstName, lastName, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10); 
      const newUser = new User({ firstName, lastName, email, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      if (error.code === 11000) { 
        res.status(400).json({ error: 'Email already exists' });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  });

module.exports=userRouter;