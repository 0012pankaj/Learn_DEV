const express = require('express');
const router = express.Router() //mini instance
const Product = require('../model/product')
const Review = require('../model/Review')

const {validateReview}=require('../middelware') //add this middlevare in create and update its use is to do SERVER SIDE VALIDATION

                                    //ss validation
router.post('/products/:id/review' , validateReview,async(req,res)=>{
  try{
    let {id} = req.params;
    let {rating,comment} =req.body;
    const product = await Product.findById(id);
    const review = new Review({rating,comment});

    product.reviews.push(review);
    await review.save();
    await product.save();
    res.redirect(`/products/${id}`);

  }catch(e){
    res.status(500).render('errpage',{err:e.message});
}
})



module.exports = router;

