
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
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Hash the token and set it to the user document
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Set token expiry to 15 minutes from now
    user.resetPasswordExpiry = new Date(Date.now() + 15 * 60 * 1000);

    // Save the user
    await user.save();

    const frontendUrl = process.env.FRONTEND_URL || req.headers.origin || 'http://localhost:5173';
    const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

    const message = `
      <h2>Password Reset Request</h2>
      <p>You requested a password reset. Click the link below to reset your password.</p>
      <p><strong>This link will expire in 15 minutes.</strong></p>
      <a href="${resetUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
      <p>Or copy this link: ${resetUrl}</p>
      <p>If you did not request this, please ignore this email.</p>
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Password Reset Link',
        message,
      });

      res.json({
        success: true,
        message: 'Email sent successfully. Please check your email for the reset link.',
      });
    } catch (error) {
      // Clear the reset token if email fails
      user.resetPasswordToken = undefined;
      user.resetPasswordExpiry = undefined;
      await user.save();

      return res.status(500).json({
        message: 'Email could not be sent. Please try again later.',
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;

    // Validate input
    if (!token || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Hash the token to find the user
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Find user with matching reset token and check if it's not expired
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: 'Invalid or expired reset token. Please request a new password reset.',
      });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user password and clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;

    await user.save();

    res.json({
      success: true,
      message: 'Password reset successfully. You can now login with your new password.',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports={registerUser,loginUser,getUserProfile,forgotPassword,resetPassword};