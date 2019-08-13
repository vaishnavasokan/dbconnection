var express = require("express");
const app=express();
var emprouter = require("./Routes/emprouter");


app.listen(8000,function(req,res)
{
    console.log("Server started.");
})

app.use("/emp",emprouter);


app.set("view engine", "ejs");
app.set("views","./src/views");

app.get("/",function(req,res)
{
    res.render("home");
})



