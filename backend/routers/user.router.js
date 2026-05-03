var express=require('express');
var router=express.Router();;
const {getUsers,verifyProvider,deleteUser}=require('../controllers/user.controller');
var {auth,isAdmin}=require('../middleware/auth.middleware');

router.get('/',[auth,isAdmin],getUsers);
router.put('/:id/verify',[auth,isAdmin],verifyProvider);
router.delete('/:id',[auth,isAdmin],deleteUser);

module.exports=router;