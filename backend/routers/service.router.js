var express=require('express');
const {auth,isProvider,isAdmin,isProviderOrAdmin}=require('../middleware/auth.middleware');
const { getServices, getServiceById, createService, updateService, deleteService } = require('../controllers/service.controller');

const router=express.Router();

router.get('/',getServices);
router.get('/getServiceById/:id',auth,getServiceById);
router.post('/createService',[auth,isProvider],createService);
router.put('/updateService/:id',[auth,isProviderOrAdmin],updateService);
router.delete('/deleteService/:id',[auth,isProviderOrAdmin],deleteService);

module.exports=router;