
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




// OTP-BASED PASSWORD RESET FLOW

// Generate and send OTP
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash OTP before storing
    const hashedOTP = crypto
      .createHash('sha256')
      .update(otp)
      .digest('hex');

    // Set OTP expiry to 10 minutes from now
    user.resetOTP = hashedOTP;
    user.resetOTPExpiry = new Date(Date.now() + 10 * 60 * 1000);
    user.otpVerified = false;

    // Save user
    await user.save();

    // Send OTP via email
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
        message: 'OTP sent to your email. Please check your inbox.',
      });
    } catch (error) {
      // Clear OTP if email fails
      user.resetOTP = undefined;
      user.resetOTPExpiry = undefined;
      await user.save();

      return res.status(500).json({
        message: 'Failed to send OTP. Please try again later.',
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify OTP
const verifyResetOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate input
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if OTP expired
    if (!user.resetOTPExpiry || user.resetOTPExpiry < Date.now()) {
      // Clear expired OTP
      if (user.resetOTPExpiry) {
        user.resetOTP = undefined;
        user.resetOTPExpiry = undefined;
        user.otpVerified = false;
        await user.save();
      }
      return res.status(400).json({
        message: 'OTP has expired. Please request a new OTP.',
      });
    }

    // Hash the provided OTP and compare
    const hashedProvidedOTP = crypto
      .createHash('sha256')
      .update(otp)
      .digest('hex');

    if (user.resetOTP !== hashedProvidedOTP) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Mark OTP as verified
    user.otpVerified = true;
    await user.save();

    res.json({
      success: true,
      message: 'OTP verified successfully. You can now reset your password.',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reset password with verified OTP
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    // Validate input
    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify OTP was verified
    if (!user.otpVerified) {
      return res.status(400).json({ message: 'Please verify OTP first' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password and clear OTP
    user.password = hashedPassword;
    user.resetOTP = undefined;
    user.resetOTPExpiry = undefined;
    user.otpVerified = false;

    await user.save();

    res.json({
      success: true,
      message: 'Password reset successfully. You can now login with your new password.',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports={registerUser,loginUser,getUserProfile,forgotPassword,verifyResetOTP,resetPassword};