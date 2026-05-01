var UserModel=require('../models/User.model');

var registerUser=async(req,res)=>{
    res.send(req.body);
}

var loginUser=async(req,res)=>{
    res.send(req.body);
}

module.exports={registerUser,loginUser};