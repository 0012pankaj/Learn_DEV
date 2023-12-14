const {productSchema , reviewSchema} = require('./joiSchema');

//after creating joiSchema we create middlewares for
//  validate and use them in between routs when Create and update

const validateProduct = (req,res,next)=>{
    const {name,img,price,dec} = req.body;
    const {error} = productSchema.validate({name,img,price,dec})
    if(error){
        return res.render('errpage');
    }
    next();
}

const validateReview = ()=>{
    const {rating,comment} = req.body;
    const {error} = reviewSchema.validate({rating,comment})
    if(error){
        return res.render('errpage');
    }
    next();
}


module.exports = {validateReview , validateProduct}

//now require them in product and review routs and use






