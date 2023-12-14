const express=require("express");
const app=express();
const path=require("path");
const mongoose = require('mongoose');
const ejsMate=require('ejs-mate');
const methodOverride=require('method-override');


mongoose.connect('mongodb://127.0.0.1:27017/comdb')
.then(()=>console.log("DB connected"))
.catch((err)=> console.log(err))



// Session--------------------------------- //instal  express-session and se before passport
const session = require("express-session"); 
app.use(session({
    secret: 'your-secret-key', // Replace with your own secret key
    resave: false,
    saveUninitialized: false
    
}));

// _______________________________

//first install than import for passport-------
const User = require('./model/user');
const passport=require('passport');
const  LocalStrategy=require('passport-local');
// ----------------------

//PASSPORT----------------------------
                   //midllewares
//1 Initialize Passport
app.use(passport.initialize());
app.use(passport.session()); 

             // 2copy from PLM... 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// ----------------------------------------------------------


//self created middleware 
app.use((req,res,next)=>{
    // console.log(req.user);
    res.locals.currentUser=req.user; //to store curent user who log in info in local storage
    next();
})


//set some property
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.engine('ejs',ejsMate);//instal andd req first and then set engin for ejs as ejs mate
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method')); //over ride post request of update to patch request

//if create rout the use route in app.js
const comedyroute=require('./route/comedyroute');
app.use(comedyroute);

const authroute=require('./route/auth');
app.use(authroute);




const port=5000;

app.listen(port,()=>{
    console.log(`conncted at ${port}`);
})