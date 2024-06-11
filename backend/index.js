const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require("./src/user");
const organizationRouter = require("./src/organization");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/users", userRouter);
app.use("/api/organizations", organizationRouter);

mongoose.connect('mongodb://localhost:27017/organizations', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
