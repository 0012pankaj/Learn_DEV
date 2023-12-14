const express=require('express');
const router=express.Router();
const  Comedy= require('../model/Comedy');
const  { validateStandup,isLoggedIn}=require('../middleware')

// create--->
router.get("/standup",async(req,res)=>{
    const products=await Comedy.find();
    res.render('productstemp/index.ejs',{products});
})

router.get("/standup/new",isLoggedIn ,async(req,res)=>{
    res.render('productstemp/new.ejs');
})


router.post('/standup', isLoggedIn ,async (req, res) => {
    
    const { comedianName,totalShows } = req.body;

    await Comedy.create({  comedianName,totalShows });

    res.redirect('/standup');
});

// // create--->

// //read-->

router.get('/standup/:id',isLoggedIn,async (req,res)=>{

    const { id }=req.params;

    const product= await Comedy.findById(id);

    res.render('productstemp/show.ejs',{product});

})

// //read-->

// //edit /UPDATE-------->
 
router.get('/standup/:id/edit',isLoggedIn ,async (req,res)=>{

    const { id }=req.params;

    const product= await Comedy.findById(id);

    res.render('productstemp/edit.ejs',{product});

})

router.patch('/standup/:id',isLoggedIn ,validateStandup, async (req, res) => {
    
    const {comedianName,totalShows} = req.body;
    const { id }=req.params;

     await Comedy.findByIdAndUpdate(id, {comedianName,totalShows });

    res.redirect(`/standup/${id}`);
});

// //edit /UPDATE-------->

// //delete--->
router.delete('/standup/:id' ,isLoggedIn ,async (req, res) => {
    
    const { id }=req.params;

     await Comedy.findByIdAndDelete(id);

    res.redirect(`/standup`);
});

// //delete-->



module.exports=router;