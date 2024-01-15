const express=require("express");
const app=express();
const path=require("path");
const mongoose = require('mongoose');
const ejsMate=require('ejs-mate');
const methodOverride=require('method-override');

const flash = require('connect-flash');
const session = require('express-session');


//first install than import for passport-------
const User = require('./model/User');
const passport=require('passport');
const  LocalStrategy=require('passport-local');
// ----------------------


mongoose.connect('mongodb://127.0.0.1:27017/pracdb2')
.then(()=>console.log("DB connected"))
.catch((err)=> console.log(err))


// 1.session ------------

app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true,
    cookie: { 
        httpOnly: true ,
        expires: Date.now() + 7*24*60*60*1000 , //expire in 7 days 
        maxAge:24*7*60*60*1000
    }
}));



//-----------------------------------


//2.PASSPORT----------------------------
                   //midllewares
//1 Initialize Passport
app.use(passport.initialize());
app.use(passport.session()); 

             // 2copy from PLM... 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// ----------------------------------------------------------

app.use(flash());

//3 self created middleware 
app.use((req,res,next)=>{
    res.locals.currentUser=req.user; //to store curent user who log in info in local storage
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


//set some property
app.set('view engin','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.engine('ejs',ejsMate);//instal andd req first and then set engin for ejs as ejs mate
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method')); //over ride post request of update to patch request


//if create rout the use route in app.js
const productrouts=require('./route/productroute');
app.use(productrouts);
const reviewrouts=require('./route/reviewroutes');
app.use(reviewrouts);
const authroute=require('./route/auth');
app.use(authroute);
const cartrouts=require('./route/cart');
app.use(cartrouts);



const port=5000;

app.listen(port,()=>{
    console.log(`conncted at ${port}`);
})