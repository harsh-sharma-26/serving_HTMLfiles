const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

//middleware: run for every request that comes in.
app.use(express.static("public")); //this is to serve static files like CSS, JS, images, etc. from the "public" directory/folder. Javascript functions are also objects under the hood, so they can be passed around and used as arguments. In this case, express.static is a function that returns a middleware function that serves static files from the specified directory.
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const htmlFilePath = path.join(__dirname, "views", "index.html");
  res.sendFile(htmlFilePath);
});

app.get("/restaurants", (req, res) => {
  const htmlFilePath = path.join(__dirname, "views", "restaurants.html");
  res.sendFile(htmlFilePath);
});

app.get("/recommend", (req, res) => {
  const htmlFilePath = path.join(__dirname, "views", "recommend.html");
  res.sendFile(htmlFilePath);
});

app.post("/recommend", (req, res) => {
  const restaurant = req.body;
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);
  storedRestaurants.push(restaurant);
  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
  res.redirect("/confirm");
});

app.get("/confirm", (req, res) => {
  const htmlFilePath = path.join(__dirname, "views", "confirm.html");
  res.sendFile(htmlFilePath);
});

app.get("/about", (req, res) => {
  const htmlFilePath = path.join(__dirname, "views", "about.html");
  res.sendFile(htmlFilePath);
});

app.listen(3000);
