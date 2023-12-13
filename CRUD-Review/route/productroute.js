const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();
const Product = require('../model/product');
const Review = require('../model/Review');

// create--->
router.get("/products",async(req,res)=>{
    const products=await Product.find();
    res.render('productstemp/index.ejs',{products});
})
router.get("/products/new",async(req,res)=>{
    res.render('productstemp/new.ejs');
})


router.post('/products', async (req, res) => {
    
    const { name, img, dec, price } = req.body;

    await Product.create({ name,img,dec, price });

    res.redirect('/products');
});

// create--->

//read-->


router.get('/products/:id',async (req,res)=>{

    const { id }=req.params;
                                            //    for giving reference to review model .populate('reviews') to sow review array
    const product= await Product.findById(id).populate('reviews');

    res.render('productstemp/show.ejs',{product});

})

//read-->

//edit /UPDATE-------->
 
router.get('/products/:id/edit',async (req,res)=>{

    const { id }=req.params;

    const product= await Product.findById(id);

    res.render('productstemp/edit.ejs',{product});

})

router.patch('/products/:id', async (req, res) => {
    
    const { name, img, dec, price } = req.body;
    const { id }=req.params;

     await Product.findByIdAndUpdate(id, { name, img, dec, price });

    res.redirect(`/products/${id}`);
});

//edit /UPDATE-------->

//delete--->
router.delete('/products/:id', async (req, res) => {
    
    const { id }=req.params;

     await Product.findByIdAndDelete(id );

    res.redirect(`/products`);
});

//delete-->








module.exports=router;