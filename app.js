const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.set("views", path.join(__dirname, "views")); //this is to set the views directory to the "views" folder in the root directory. The views directory is where we will store our EJS templates. The path.join() method is used to create a path string that is compatible with the operating system.

app.set("view engine", "ejs"); //this is to set the view engine to EJS, which is a templating engine that allows us to generate HTML pages dynamically. EJS stands for Embedded JavaScript, and it allows us to embed JavaScript code within our HTML templates. This is useful for rendering dynamic content on the server side before sending it to the client.

//middleware: run for every request that comes in.
app.use(express.static("public")); //this is to serve static files like CSS, JS, images, etc. from the "public" directory/folder. Javascript functions are also objects under the hood, so they can be passed around and used as arguments. In this case, express.static is a function that returns a middleware function that serves static files from the specified directory.

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index"); // render is an express.js method of res object.
});

app.get("/restaurants", (req, res) => {
  const filePath = path.join(__dirname, "data", "restaurants.json"); //getting the filepath.
  const fileData = fs.readFileSync(filePath); //opening the file for reading data inside it.
  const storedRestaurants = JSON.parse(fileData); //converting the file's raw text into javascript array.
  let totalRestaurants = storedRestaurants.length; //getting the number of elements in the array.
  res.render("restaurants", {
    numberOfRestaurants: totalRestaurants,
    restaurants: storedRestaurants,
  }); //you need to pass in the second argument if you do have some dynamic content in your corresponding html file. Key: value pair, Key should match with the variable name in the ejs file and value we are transferring from here.
});

app.get("/recommend", (req, res) => {
  res.render("recommend");
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
  res.render("confirm");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(3000);
