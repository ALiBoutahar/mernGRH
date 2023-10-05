const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
app.use(express.json());
const cors =require("cors");
app.use(cors());

app.use(express.urlencoded({ extended: true }));

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// *********************************************************** importation de Configuration
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT;
const dbName = process.env.dbName;

// *********************************************************** DataBase connecter
mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`);

// *********************************************************** les controller exicutable
app.use(require("./controller/persone"));
app.use(require("./controller/users"));
app.use(require("./controller/email"));

app.get("/",async(req,res)=>{res.render("home/index");});
app.get("/send-ejs",async(req,res)=>{res.render("send",{ statuts: "", color: "" });});

// *********************************************************** Port listen 5000
app.listen(port, () => {

  console.log('');
  console.log('___________________________________________________');
  console.log(`Server is running on port | ${port}                  |`);
  console.log(`url run application       | http://localhost:${port} |`);
  console.log('---------------------------------------------------');
});
