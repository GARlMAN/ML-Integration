const express = require("express");
const app = express();

const request = require("request");

app.get("/", (req, res) => {
  res.send("Its working!")
})

app.get("/postData", (req, res) => {
  res.send("Hello")
})
app.post("/postData", (req, res) => {
  res.json(req.body)
  console.log(req.body)
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening to ${port} ...`)
})