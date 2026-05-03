var express=require('express');
var router=express.Router();;
const {getUsers,verifyProvider,deleteUser,getStats,deleteService,getServices,getProviders}=require('../controllers/user.controller');
var {auth,isAdmin}=require('../middleware/auth.middleware');

router.get('/users',[auth,isAdmin],getUsers);
router.put('/:id/verify',[auth,isAdmin],verifyProvider);
router.delete('/:id',[auth,isAdmin],deleteUser);
router.get('/stats',[auth,isAdmin],getStats);
router.get('/services',[auth,isAdmin],getServices);
router.delete('/services/:id',[auth,isAdmin],deleteService);
router.get('/providers',[auth,isAdmin],getProviders);

module.exports=router;