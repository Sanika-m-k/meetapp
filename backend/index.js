const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require("./src/user");
const organizationRouter = require("./src/organization");
const {chatsRouter} = require('./src/chats');
const meetRouter = require('./src/meet')
const dotenv= require('dotenv')

const app = express();
const PORT = 8080;
const server = http.createServer(app);

dotenv.config()

app.use(cors({
  origin: 'https://meetapp-lq15.onrender.com', // Frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));app.use(bodyParser.json());
app.use("/api/users", userRouter);
app.use("/api/organizations", organizationRouter);
app.use("/api/chats", chatsRouter);
app.use("/api/meet", meetRouter);

const uri=process.env.MONGODB_URI

mongoose.connect(uri)
        .then(()=>{
          console.log("Connected to MongoDB database")
        })
require('./src/socket')(server);
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
