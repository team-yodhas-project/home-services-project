var express=require('express');
var app=express();
var router=express.Router();
var UserModel=require('../models/User.model');
const {registerUser,loginUser}=require('../controllers/auth.controller');

router.post('/register',registerUser);
router.post('/login',loginUser);
module.exports=router;