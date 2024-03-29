const express=require("express");
const app=express();
const path=require("path");
const mongoose = require('mongoose');
const ejsMate=require('ejs-mate');
const methodOverride=require('method-override');

const flash = require('connect-flash');
const session = require('express-session');


mongoose.connect('mongodb://127.0.0.1:27017/pracdb2')
.then(()=>console.log("DB connected"))
.catch((err)=> console.log(err))


//set some property
app.set('view engin','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.engine('ejs',ejsMate);//instal andd req first and then set engin for ejs as ejs mate
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method')); //over ride post request of update to patch request

//use flash and session together

app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
}));

app.use(flash());
app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

//if create rout the use route in app.js
const productrouts=require('./route/productroute');
app.use(productrouts);
const reviewrouts=require('./route/reviewroutes');
app.use(reviewrouts);




const port=5000;

app.listen(port,()=>{
    console.log(`conncted at ${port}`);
})