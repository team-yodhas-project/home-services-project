var bcrypt = require('bcryptjs');
var User=require('../models/User.model');
var jwt=require('jsonwebtoken');
var geocodeAddress=require('../utils/geocode');
var generateToken=require('../utils/generateToken');




  const removeAccount=async(req,res)=>{
    try{
      await User.findByIdAndDelete(req.user._id);
      res.json({message:'Account removed successfully'}); 
    }
    catch(error){
      res.status(500).json({message:error.message});
    }
  }



  const changePassword=async(req,res)=>{
    try{
      const {oldPassword,newPassword,confirmNewPassword}=req.body;
      const user=await User.findById(req.user._id).select('+password');

      if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
     
    const isMatch=await bcrypt.compare(oldPassword,user.password);
    if(!isMatch){
      return res.status(400).json({message:'current  password is incorrect'});
    }
    
    // Check confirm password
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        message: 'Passwords do not match',
      });
    }

    //hash password
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(newPassword,salt);


    user.password=hashedPassword;
    await user.save();

    res.json({message:'Password changed successfully'});
  
  }
  catch(err){
    res.status(500).json({message:err.message})
    }
  }
  

  const updateProfile=async(req,res)=>{
    try{
      const {name,phone,skills,experience,address}=req.body;
      const user=await User.findById(req.user._id);

      if(!user){
        return res.status(404).json({message:'User not found'})
      }

      // Update fields
    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.skills = skills || user.skills;
    user.experience = experience || user.experience;

    if(address){
      const geoData=await geocodeAddress(address);

      if(geoData){
        user.location=geoData;
      }
    }
    await user.save();
    res.json({message:'Profile updated successfully',
      user:{
         _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        skills: user.skills,
        experience: user.experience,
        location: user.location,
      }
    });
  }
  catch(err){
      return res.status(500).json({message:err.message})
    }
  }
module.exports={
  removeAccount,
  changePassword,
  updateProfile
}