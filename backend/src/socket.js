const socketIo = require('socket.io');
const { Chat, chatsRouter } = require('./chats'); 

module.exports = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "https://meetapp-lq15.onrender.com",
      methods: ["GET", "POST", 'PUT', 'DELETE'],
      allowedHeaders: ["Content-Type"],
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinRoom', (organizationCode) => {
      socket.join(String(organizationCode)); // Ensure organizationCode is a string
      Chat.find({ organizationCode: String(organizationCode) }).then((messages) => {
        socket.emit('initialMessages', messages);
      });
    });

    socket.on('sendMessage', async (data) => {
      const { text, email, organizationCode } = data;
      console.log("data:",data)
      const message = new Chat({ text, email, organizationCode: String(organizationCode) }); // Ensure organizationCode is a string
      await message.save();
      io.to(organizationCode).emit('message', message);
    });

    socket.on('deleteMessage', async (id) => {
      const message = await Chat.findByIdAndDelete(id);
      if (message) {
        io.to(message.organizationCode).emit('messageDeleted', id);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};
