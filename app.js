//jshint esversion:6


const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["buy","cook","eat"];
let workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/", function(req, res) {

  let today = new Date();
let options = {
  weekday: "long",
  day: "numeric",
  month:"long",
  year:"numeric"
};


let day = today.toLocaleDateString("en-US", options);
//var day = today.toLocaleDateString("hi-IN", options);

  res.render("list", {listTitle:day, newListItems:items});

  app.post("/", function(req, res){
    let item = req.body.newItem;
  if(req.body.list === "work"){
    workItems.push(item);
    res.redirect("/work");
  } else {


    items.push(item);
     res.redirect("/");

  }



  });

  app.get("/work",function(req, res){

    res.render("list", {listTitle: "work list", newListItems: workItems});

  });

  app.get("/about", function(req, res){
    res.render("about");
  });

  app.post("/work",function(req,res){

    let item = req.body.newItem;

    workItems.push(item);

    res.redirect("/work");
  });
});



app.listen(3000, function() {

  console.log("server is up !");

});
