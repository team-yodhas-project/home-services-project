var express=require('express');
var app=express();
var router=express.Router();
var User=require('../models/User.model');
const {auth,isCustomer,isProvider,isAdmin}=require('../middleware/auth.middleware');
const {registerUser,loginUser,getUserProfile}=require('../controllers/auth.controller');

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/profile',auth,getUserProfile)
module.exports=router;