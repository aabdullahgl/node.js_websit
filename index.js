var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.static('node_modules'));
var path = require('path');
var bodyparser = require("body-parser");
var session = require("express-session");
var { v4: uuidv4 } = require("uuid");

var router = require('./router');
var mysql = require('mysql');
var connection  = require('./lib/db');
var cookieParser = require('cookie-parser');
 var logger = require('morgan');
 var expressValidator = require('express-validator');
 var flash = require('express-flash');
 var createError = require('http-errors');

 var customersRouter = require('./routes/customers');
 
 

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// load static assets
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

app.use(session({
    secret: uuidv4(), //  '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    resave: false,
    saveUninitialized: true
}));

app.use('/route', router);
app.use(flash());
 app.use(expressValidator());
app.use('/customers', customersRouter);

// home route
app.get('/x', (req, res) =>{
    res.render('base', { title : "Login System"});
})


const data=[
    {id:1,name:"Iphone X", price:30000,isActive:true, imageUrl: "iphoneX.jpg"},
    {id:2,name:"Iphone 11", price:40000,isActive:true, imageUrl:"iphone11.jpg"},
    {id:3,name:"Iphone 12", price:50000,isActive:true, imageUrl:"iphone12.png"}
];

app.use("/sube", function (req, res) {
    res.render("sube",)
});
app.use("/login", function (req, res) {
    res.render("login")
});
app.use("/add", function (req, res) {
    res.render("form")
});
app.use("/view", function (req, res) {
    res.render("table")
});
app.use("/", function (req, res) {
    res.render("index")
});


app.use("/urunler/:id", function (req, res) {
    const urun=data.find(u=>u.id==req.params.id);
    res.render("urundetay",urun)
});
app.use("/404", function (req, res) {
    res.render("404",)
});
app.use("/urunler", function (req, res) {
    res.render("urunler",{
        urunler:data
    })
});







app.listen(3000, () => {
    console.log("listening on port 3000");
})