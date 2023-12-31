const mongoose=require('mongoose');

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

    }

})

const Product=mongoose.model("Product",productSchema);
module.exports=Product;