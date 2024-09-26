const { validationResult } = require('express-validator');
const Role = require('../../models/roleModels');

const StoreRole = async(req,res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors:errors.array()
            })
        }

        const { role_name, role_value } = req.body;
        const role = new Role({
            role_name,
            role_value
        });
        const roleData = await role.save();
        return res.status(200).json({
            success: true,
            msg: 'Role Created Successfully',
            data:roleData
        })

    }
    catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const GetRole = async(req,res) => {
    try{
        const roleData = await Role.find({
            role_value:{
                $ne:1 //admin
            }
        });
        return res.status(200).json({
            success: true,
            msg: 'Role Fetched Successfully!',
            data: roleData
        })
    }
    catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

module.exports = {
    StoreRole,
    GetRole
}