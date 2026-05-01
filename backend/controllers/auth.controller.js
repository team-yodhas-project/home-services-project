var User=require('../models/User.model');
import bcrypt from 'bcryptjs';
import generateToken  from '../utils/generateToken';
import geocodeAddress from '../utils/geocodeAddress';

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
        profilePic: user.profilePic,
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
    res.send(req.body);
}

module.exports={registerUser,loginUser};