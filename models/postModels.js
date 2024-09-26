const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    cource_name:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Coursce', postSchema);