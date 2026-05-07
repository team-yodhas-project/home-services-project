var User=require('../models/user.model');
var Service =require('../models/service.model');


//to get stats for admin dashboard

const getStats=async(req,res)=>{
  try{
    const totalUsers=await User.countDocuments();
    const totalProviders=await User.countDocuments({role:'provider'});
    const totalCustomers=await User.countDocuments({role:'customer'});
    const totalServices=await Service.countDocuments();
    res.json({totalUsers,totalProviders,totalCustomers,totalServices})
  }
  catch(err){
    res.status(500).json({message:err.message})
  }
}


// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers=async(req,res)=>{
    try{
        const users=await User.find({});
        res.json(users)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}


// // @desc    Verify provider
// // @route   PUT /api/users/:id/verify
// // @access  Private/Admin

// const verifyProvider=async(req,res)=>{
//     try{
//         const user=await User.findById(req.params.id);
        
//         if (user && user.role === 'provider') {
//       user.isVerified = true;
//       const updatedUser = await user.save();
//       res.json(updatedUser);
//     } else {
//       res.status(404).json({ message: 'Provider not found or not a provider' });
//     }
    
//     }
//     catch (error) {
//     res.status(500).json({ message: error.message });
//     }
// }

// // @desc    Delete user
// // @route   DELETE /api/users/:id
// // @access  Private/Admin

// const deleteUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);

//     if (user) {
//       await user.deleteOne();
//       res.json({ message: 'User removed' });
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



// @desc    Get all services (admin monitoring)
// @route   GET /api/users/admin/services
// @access  Private/Admin
const getServices=async(req,res)=>{
  try{
    const services =await Service.find().populate('providerId','name email role');
    res.json(services);
  }
  catch(err){
    res.status(500).json({message:err.message})
  }
} 

// // @desc    Delete service
// // @route   DELETE /api/users/admin/services/:id
// // @access  Private/Admin

// const deleteService=async(req,res)=>{
//   try{
//       const service=await Service.findById(req.params.id);
//       if(service){
//         await service.deleteOne();
//         res.json({message:'Service removed'})
//       }
//       else{
//         res.status(404).json({message:'Service not found'})
//       }
//   }
//   catch(err){
//     res.status(500).json({message:err.message})
//   }
// }

// @desc    Get all providers
// @route   GET /api/users/admin/providers
// @access  Private/Admin

const getProviders = async (req, res) => {
  try {
    const providers = await User.find({ role: "provider" });
    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




module.exports={getStats,getUsers,getServices,getProviders}