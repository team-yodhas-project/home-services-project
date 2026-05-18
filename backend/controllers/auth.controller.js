
var bcrypt = require('bcryptjs');
var User=require('../models/User.model');
var jwt=require('jsonwebtoken');
var geocodeAddress=require('../utils/geocode');
var generateToken=require('../utils/generateToken');
var crypto = require('crypto');
var sendEmail = require('../utils/sendEmail');

var registerUser=async(req,res)=>{
   try{
    const {name,email,password,role,phone,skills,experience,address}=req.body;
    const userExists=await User.findOne({email});

    if(userExists){
        return res.status(400).json({message:'User already exists'});
    }
    
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);

    let locationData=null;
    if( address){
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
      phone: phone || '',
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
        phone: user.phone,
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
          phone: user.phone,
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
        phone: user.phone,
        skills: user.skills,
        experience: user.experience,
        location: user.location,
        documents: user.documents
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}




const forgotPassword = async (req, res) => {
  try {
    const { email, phone } = req.body;

    if (!email && !phone) {
      return res.status(400).json({ message: 'Email or phone is required' });
    }

    let user;
    if (email) {
      user = await User.findOne({ email });
    } else {
      user = await User.findOne({ phone });
    }

    if (!user) {
      return res.status(404).json({ message: 'User account not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    req.session.resetOTP = otp;
    req.session.resetOTPExpiry = Date.now() + 10 * 60 * 1000;
    req.session.resetUserEmail = user.email;
    req.session.resetVerified = false;

    if (email) {
      const message = `
        <h2>Password Reset OTP</h2>
        <p>Your OTP for password reset is:</p>
        <h1 style="color: #2563eb; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
        <p><strong>This OTP will expire in 10 minutes.</strong></p>
        <p>If you did not request this, please ignore this email.</p>
      `;

      try {
        await sendEmail({
          email: user.email,
          subject: 'Password Reset OTP',
          message,
        });
        res.json({
          success: true,
          message: 'OTP sent to your email',
        });
      } catch (emailError) {
        delete req.session.resetOTP;
        delete req.session.resetOTPExpiry;
        delete req.session.resetUserEmail;
        req.session.resetVerified = false;
        console.error('Email sending failed:', emailError.message);
        res.status(500).json({ message: 'Failed to send OTP by email. Please try again later.' });
      }
    } else {
      console.log(`[DEV] Password reset OTP for ${user.phone}: ${otp}`);
      res.json({
        success: true,
        message: 'OTP generated and logged for phone number in development',
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyResetOTP = async (req, res) => {
  try {
    const { otp } = req.body;

    if (!otp) {
      return res.status(400).json({ message: 'OTP is required' });
    }

    if (!req.session.resetOTP || !req.session.resetOTPExpiry) {
      return res.status(400).json({ message: 'No OTP request found. Please request a new OTP.' });
    }

    if (req.session.resetOTPExpiry < Date.now()) {
      delete req.session.resetOTP;
      delete req.session.resetOTPExpiry;
      delete req.session.resetUserEmail;
      req.session.resetVerified = false;
      return res.status(400).json({ message: 'OTP has expired. Please request a new OTP.' });
    }

    if (req.session.resetOTP !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    req.session.resetVerified = true;
    res.json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;

    if (!newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    if (!req.session.resetVerified || !req.session.resetUserEmail) {
      return res.status(400).json({ message: 'Please verify OTP first' });
    }

    const user = await User.findOne({ email: req.session.resetUserEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    delete req.session.resetOTP;
    delete req.session.resetOTPExpiry;
    delete req.session.resetUserEmail;
    delete req.session.resetVerified;

    res.json({ success: true, message: 'Password reset successfully. You can now login with your new password.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports={registerUser,loginUser,getUserProfile,forgotPassword,verifyResetOTP,resetPassword};