const express = require('express');
const mongoose = require('mongoose');

const chatsRouter = express.Router();

const chatSchema = new mongoose.Schema({
  organizationCode: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.model('Chat', chatSchema);

chatsRouter.get('/:organizationCode', async (req, res) => {
  try {
    const { organizationCode } = req.params;
    console.log(organizationCode);
    const chats = await Chat.find({ organizationCode }).sort('timestamp');
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

chatsRouter.delete('/messages/:id',async(req,res)=>{

  try{
    await Chat.findByIdAndDelete(req.params.id);
    res.status(200).send('Message deleted')
  }
  catch(error){
    res.status(500).send('Error deleting message: ', error)
  }
})


module.exports = {chatsRouter,Chat};
