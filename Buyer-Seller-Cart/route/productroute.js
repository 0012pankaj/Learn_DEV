const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();
const Product = require('../model/product');
const Review = require('../model/Review');

const {isProductAuthor, validateProduct,isLoggedIn,isSeller}=require('../middelware') //add this middlevare in create and update its use is to do SERVER SIDE VALIDATION

router.get("/products",isLoggedIn,async(req,res)=>{

    try{
        const products=await Product.find();
        res.render('productstemp/index.ejs',{products});

    }catch(e){
        res.status(500).render('errpage',{err:e.message});
    }
    
})

// create--->
router.get("/products/new",isLoggedIn,async(req,res)=>{
    try{
        res.render('productstemp/new.ejs');
    }catch(e){
        res.status(500).render('errpage',{err:e.message});
    }
   
})

                          //ssvalidation    //isSeller make sure that if it is buyer it cant create new products ,server-side validation by creation middleware 
router.post('/products',isLoggedIn, isSeller,validateProduct, async (req, res) => {
    try{
        const { name, img, dec, price } = req.body;        
        await Product.create({ name,img,dec, price ,author:req.user._id});

        req.flash('success' , 'Product added successfully');
        res.redirect('/products');
       
    }catch(e){
        res.status(500).render('errpage',{err:e.message});
    }
    
});

// create--->

//read-->


router.get('/products/:id',isLoggedIn,async (req,res)=>{
    try{

        const { id }=req.params;
 //    for giving reference to review model use .populate('reviews') to sow review array
     const product= await Product.findById(id).populate('reviews');
     res.render('productstemp/show.ejs',{product});  // use populate to acess review array, as it refer: review collection
       
    }catch(e){
        res.status(500).render('errpage',{err:e.message});
    }
    

})

//read-->

//edit /UPDATE-------->
 
router.get('/products/:id/edit',isLoggedIn,async (req,res)=>{
    try{ 

        const { id }=req.params;
        const product= await Product.findById(id);

        res.render('productstemp/edit.ejs',{product});

       
    }catch(e){
        res.status(500).render('errpage',{err:e.message});
    }
    
})
                               //ssvalidation
router.patch('/products/:id', validateProduct,isLoggedIn,async (req, res) => {
    try{
        const { name, img, dec, price } = req.body;
        const { id }=req.params;
      await Product.findByIdAndUpdate(id, { name, img, dec, price });

       req.flash('success' , 'Product edited successfully');
       res.redirect(`/products/${id}`);
       
    }catch(e){
        res.status(500).render('errpage',{err:e.message});
    }
   
});

//edit /UPDATE-------->

//delete--->
router.delete('/products/:id', isLoggedIn,isProductAuthor, async (req, res) => {
    try{
    const { id }=req.params;
    await Product.findByIdAndDelete(id );

    req.flash('success' , 'Product deleted successfully');
    res.redirect(`/products`); 

    }catch(e){
        res.status(500).render('errpage',{err:e.message});
    }
    
});

//delete-->








module.exports=router;