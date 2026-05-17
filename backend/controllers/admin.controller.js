var User=require('../models/user.model');
var Service =require('../models/service.model');
const Booking = require('../models/booking.model');
const Review = require('../models/review.model');


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
    const cancelledBookings=await Booking.countDocuments({status:'cancelled'})
    const totalReviews=await Review.countDocuments();

    
      const averageRating = await Review.aggregate([
    {
      $group: {
        _id: null,
        average: { $avg: "$rating" }
      }
    }
  ]);
    const monthlyBookings = await Booking.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: 1 }
        }
      },
      {
        $sort: { "_id": 1 }
      }
    ]);

      const bookingStatusStats = await Booking.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 }
      }
    }
  ]);
          // Top Providers
        const topProviders = await Booking.aggregate([
      {
        $match: { status: "completed" }
      },
      {
        $group: {
          _id: "$providerId",
          completedJobs: { $sum: 1 }
        }
      },
      {
        $sort: { completedJobs: -1 }
      },
      {
        $limit: 5
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "provider"
        }
      },
      {
        $unwind: "$provider"
      },
      {
        $project: {
          completedJobs: 1,
          providerName: "$provider.name",
          providerEmail: "$provider.email"
        }
      }
    ]);


        const today = new Date();
    today.setHours(0,0,0,0);

    const todaysBookings = await Booking.countDocuments({
      createdAt: { $gte: today }
    });
  

        const popularServices = await Booking.aggregate([
      {
        $group: {
          _id: "$serviceId",
          totalBookings: { $sum: 1 }
        }
      },
      {
        $sort: { totalBookings: -1 }
      },
      {
        $limit: 5
      },
      {
        $lookup: {
          from: "services",
          localField: "_id",
          foreignField: "_id",
          as: "service"
        }
      },
      {
        $unwind: "$service"
      },
      {
        $project: {
          totalBookings: 1,
          serviceTitle: "$service.title",
          servicePrice: "$service.price"
        }
      }
    ]);


      const recentBookings = await Booking.find()
      .populate('customerId','name')
      .populate('providerId','name')
      .populate('serviceId','title')
      .sort({createdAt:-1})
      .limit(5);

      
    res.json({totalUsers,totalProviders,totalCustomers,totalServices,totalBookings,completedBookings,pendingBookings,rejectedBookings,totalReviews,monthlyBookings,topProviders,cancelledBookings,averageRating: averageRating[0]?.average || 0,todaysBookings,popularServices,bookingStatusStats,recentBookings});
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
        const users=await User.find({}).select('-password');
        res.json(users)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}


const getServices=async(req,res)=>{
  try{
    const services =await Service.find().populate('providerId','name email role');
    console.log(services);
    res.json(services);
  }
  catch(err){
    res.status(500).json({message:err.message})
  }
} 

const getProviders = async (req, res) => {
  try {
    const providers = await User.find({ role: "provider" }).select('-password');
    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





module.exports={getStats,getUsers,getServices,getProviders};