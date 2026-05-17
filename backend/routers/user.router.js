var express=require('express');
var app=express();
var router=express.Router();
var User=require('../models/User.model');
const {auth,isCustomer,isProvider,isAdmin}=require('../middleware/auth.middleware');
const {removeAccount,changePassword,updateProfile}=require('../controllers/user.controller');    
router.delete('/signout/:id',auth,removeAccount);
router.patch('/changePassword/:id',auth,changePassword);
router.patch('/updateProfile/:id',auth,updateProfile)
module.exports=router;