var express=require('express');
var app=express();
var router=express.Router();
var User=require('../models/User.model');
const {auth,isCustomer,isProvider,isAdmin}=require('../middleware/auth.middleware');
const {registerUser,loginUser, getUserProfile, forgotPassword, resetPassword, sendPasswordResetOTP, verifyPasswordResetOTP, resetPasswordWithOTP}=require('../controllers/auth.controller');
var upload=require('../middleware/upload.middleware.js');
router.post('/register',upload.array('documents', 3),registerUser);
router.post('/login',loginUser);
router.get('/profile',auth,getUserProfile);

// Token-based reset (legacy)
router.post('/forgot-password',forgotPassword);
router.post('/reset-password',resetPassword);

// OTP-based reset (new)
router.post('/send-password-reset-otp',sendPasswordResetOTP);
router.post('/verify-password-reset-otp',verifyPasswordResetOTP);
router.post('/reset-password-with-otp',resetPasswordWithOTP);

module.exports=router;