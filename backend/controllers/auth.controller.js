
var bcrypt = require('bcryptjs');
var User=require('../models/User.model');
var jwt=require('jsonwebtoken');
var geocodeAddress=require('../utils/geocode');
var generateToken=require('../utils/generateToken');

var registerUser=async(req,res)=>{
   try{
    const {name,email,password,role,skills,experience,address}=req.body;
    const userExists=await User.findOne({email});

    if(userExists){
        return res.status(400).json({message:'User already exista'});
    }
    
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);

    let locationData=null;
    if(role==='provider' && address){
        const geoData=await geocodeAddress(address);
        if(geoData){
            locationData= geoData;
        }
    }
   
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'customer',
      skills: skills || [],
      experience: experience || 0,
      location: locationData,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }

   }
   catch(error){
    res.status(500).json({message:error.message})
   }


}

var loginUser=async(req,res)=>{
    try{
      const {email,password}=req.body;
      const user=await User.findOne({email}).select('+password');

      if(user && (await bcrypt.compare(password,user.password)) ){
        res.json({
          _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        token: generateToken(user._id)
        })
      }
      else{
        res.status(401).json({message:'Invalid email or password'});
      }
    }
    catch(error){
      res.status(500).json({message:error.message});
    }
}

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        skills: user.skills,
        experience: user.experience,
        location: user.location,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }}

module.exports={registerUser,loginUser,getUserProfile};