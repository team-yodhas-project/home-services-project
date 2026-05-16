var User=require('../models/user.model');
var Service =require('../models/service.model');


//to get stats for admin dashboard

const getStats=async(req,res)=>{
  try{
    const totalUsers=await User.countDocuments();
    const totalProviders=await User.countDocuments({role:'provider'});
    const totalCustomers=await User.countDocuments({role:'customer'});
    const totalServices=await Service.countDocuments();
    const totalBookings=await Booking.countDocuments();
    const completedBookings=await Booking.countDocuments({status:'completed'});
    const pendingBookings=await Booking.countDocuments({status:'pending'});
    const rejectedBookings=await Booking.countDocuments({status:'rejected'});
    const totalReviews=await Review.countDocuments();
  
    res.json({totalUsers,totalProviders,totalCustomers,totalServices,totalBookings,completedBookings,pendingBookings,rejectedBookings,totalReviews,averageRating:averageRating[0]?.average || 0});
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


const getServices=async(req,res)=>{
  try{
    const services =await Service.find().populate('providerId','name email role');
    res.json(services);
  }
  catch(err){
    res.status(500).json({message:err.message})
  }
} 

const getProviders = async (req, res) => {
  try {
    const providers = await User.find({ role: "provider" });
    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





module.exports={getStats,getUsers,getServices,getProviders};