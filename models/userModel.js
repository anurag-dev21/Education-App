const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default:0 // 0 = Students || 1 = admin || 2 = teacher
    },
});

module.exports = mongoose.model('User', userSchema);