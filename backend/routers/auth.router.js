var express=require('express');
var router=express.Router();
const {auth}=require('../middleware/auth.middleware');
const {registerUser,loginUser, getUserProfile, forgotPassword, verifyResetOTP, resetPassword}=require('../controllers/auth.controller');
var upload=require('../middleware/upload.middleware.js');

router.post('/register',upload.array('documents', 3),registerUser);
router.post('/login',loginUser);
router.get('/profile',auth,getUserProfile);

router.post('/send-password-reset-otp',forgotPassword);
router.post('/verify-password-reset-otp',verifyResetOTP);
router.post('/reset-password-with-otp',resetPassword);

console.log("AUTH ROUTER LOADED");
module.exports=router;