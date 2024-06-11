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

const uri="mongodb+srv://sanikakadam604:m1x938GkYevz2d9i@cluster0.jhf3gzj.mongodb.net/meetapp?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(uri)
        .then(()=>{
          console.log("Connected to MongoDB database")
        })

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
