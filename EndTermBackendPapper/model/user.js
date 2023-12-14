const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
// /* i consider the name productSchema as i used the userSchema name in Authentication here  *?
// please consider this schemaname please...............

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        required:true
    },
    isCouple:{
        type:String,
        trim:true,
        required:true
    },passNumber:{
        type:Number,
        required:true
    },age:{
        type:Number,
        required:true
    }

});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);