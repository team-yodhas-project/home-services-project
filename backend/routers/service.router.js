var express=require('express');
const {auth,isProvider,isAdmin}=require('../middleware/auth.middleware');
const { getServices, getServiceById, createService, updateService, deleteService,disableService } = require('../controllers/service.controller');

const router=express.Router();

router.get('/',getServices);
router.get('/getServiceById/:id',auth,getServiceById);
router.post('/createService',[auth,isProvider],createService);
router.put('/updateService/:id',[auth,isProvider],updateService);
router.delete('/deleteService/:id',[auth,isProvider],deleteService);
router.patch('/disableService/:id',[auth,isProvider],disableService);

module.exports=router;