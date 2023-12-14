const mongoose=require('mongoose');
const Review = require('./Review');

const productSchema=new mongoose.Schema({
    name : {
       type:String,
       trim:true,
       required:true

    },
    img:{
      type:String,
      trim:true,
      default:"./image/product.js"
    },
    price:{
      type:Number,
      min:0,
      default:0

    },
    dec:{
        type:String,
        trim:true

    },
    reviews:[
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Review'
      }
  ]

})

//middlewareof moongose --> pre / post apply on monoose Schema they work after or before monodb operation 
// middleware jo  mongodb operations karwane par use hota hai and iske andar pre nd post middleware hote hai which 
//are basically used over the schema and before the model is js class.
// when we do  Product.findByIdAndDelete(id ); this delete allthe reviews of that product
                                                  //product--> whose id is there
productSchema.post('findOneAndDelete' , async function(product){
  if(product.reviews.length > 0){
      await Review.deleteMany({_id:{$in:product.reviews}})
  }
})


const Product=mongoose.model("Product",productSchema);
module.exports=Product;