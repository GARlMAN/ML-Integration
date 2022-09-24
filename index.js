const express = require("express");
const app = express();

const request = require("request");
const mongoose = require("mongoose");

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening to ${port} ...`)
})
app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb" }));

// for CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-auth-token'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});


mongoose.connect(
  "mongodb+srv://mlintegration:mlintegration@cluster0.7252un9.mongodb.net/?retryWrites=true&w=majority"
)
  .then(() => console.log("Connected to the database"))
  .catch(err => console.log(`Error encountered while connecting with database: ${err}`))

const {ImageUpload} = require("./schema");

app.get("/", (req, res) => {
  res.send("Its working!")
})

app.post("/uploadImage", (req, res) => {
  const data = new ImageUpload(req.body);
  res.json(data);
  data.save()
    .then(() => console.log("Data saved successfully"))
    .catch((err) => console.log(`Error encountered while estabilishing server: ${err}`))
})

app.get("/uploadImage", (req, res) => {
  ImageUpload.find()
    .then(response => res.send(response))
    .catch(err => console.log(err))
})
