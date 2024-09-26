const mongoose = require('mongoose');

const UserPermissionSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    permisions:[{
        permisions_name: String,
        permisions_value: [Number]
    }]
});

module.exports = mongoose.model('UserPermision', UserPermissionSchema);