var express=require('express');
var router=express.Router();
const {auth}=require('../middleware/auth.middleware');
const {registerUser,loginUser, getUserProfile, forgotPassword, verifyResetOTP, resetPassword}=require('../controllers/auth.controller');
var upload=require('../middleware/upload.middleware.js');

router.post('/register',upload.array('documents', 3),registerUser);
router.post('/login',loginUser);
router.get('/profile',auth,getUserProfile);

router.post('/forgot-password',forgotPassword);
router.post('/verify-reset-otp',verifyResetOTP);
router.post('/reset-password',resetPassword);

module.exports=router;