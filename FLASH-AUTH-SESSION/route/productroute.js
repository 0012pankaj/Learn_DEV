const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();
const Product = require('../model/product');
const Review = require('../model/Review');

const {validateProduct}=require('../middelware') //add this middlevare in create and update its use is to do SERVER SIDE VALIDATION

router.get("/products",async(req,res)=>{

    try{
        const products=await Product.find();
        res.render('productstemp/index.ejs',{products});

    }catch(e){
        res.status(500).render('errpage',{err:e.message});
    }
    
})

// create--->
router.get("/products/new",async(req,res)=>{
    try{
        res.render('productstemp/new.ejs');
    }catch(e){
        res.status(500).render('errpage',{err:e.message});
    }
   
})

                          //ssvalidation
router.post('/products',validateProduct, async (req, res) => {
    try{
        const { name, img, dec, price } = req.body;
        await Product.create({ name,img,dec, price });

        req.flash('success' , 'Product added successfully');
        res.redirect('/products');
       
    }catch(e){
        res.status(500).render('errpage',{err:e.message});
    }
    
});

// create--->

//read-->


router.get('/products/:id',async (req,res)=>{
    try{

        const { id }=req.params;
 //    for giving reference to review model use .populate('reviews') to sow review array
     const product= await Product.findById(id).populate('reviews');
     res.render('productstemp/show.ejs',{product});
       
    }catch(e){
        res.status(500).render('errpage',{err:e.message});
    }
    

})

//read-->

//edit /UPDATE-------->
 
router.get('/products/:id/edit',async (req,res)=>{
    try{ 

        const { id }=req.params;
        const product= await Product.findById(id);

        res.render('productstemp/edit.ejs',{product});

       
    }catch(e){
        res.status(500).render('errpage',{err:e.message});
    }
    
})
                               //ssvalidation
router.patch('/products/:id', validateProduct,async (req, res) => {
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
router.delete('/products/:id', async (req, res) => {
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