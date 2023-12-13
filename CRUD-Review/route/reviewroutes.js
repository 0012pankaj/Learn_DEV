const express = require('express');
const router = express.Router() //mini instance
const Product = require('../model/product')
const Review = require('../model/Review')


router.post('/products/:id/review' , async(req,res)=>{
    let {id} = req.params;
    let {rating,comment} =req.body;
    const product = await Product.findById(id);
    const review = new Review({rating,comment});

      product.reviews.push(review);
    await review.save();
    await product.save();
  
    res.redirect(`/products/${id}`);
})



module.exports = router;

