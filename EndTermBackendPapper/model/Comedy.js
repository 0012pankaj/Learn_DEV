const mongoose=require('mongoose');
const comedySchema=new mongoose.Schema({
  comedianName:{
       type:String,
       trim:true,
       required:true
    },
    totalShows:{
      type:Number,
      required:true
    }

})

const Comedy=mongoose.model("Comedy",comedySchema);
module.exports=Comedy;