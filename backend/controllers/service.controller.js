var Service=require('../models/service.model.js');
var geocodeAddress=require('../utils/geocode.js');

const getServices = async (req, res) => {
  try {
    const { keyword, address, distance = 50 } = req.query;

    let query = { isActive: true };

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
      ];
    }

    if (address) {
      const geoData = await geocodeAddress(address);

      if (geoData) {
        const radius = distance / 6378.1;

        query.location = {
          $geoWithin: {
            $centerSphere: [geoData.coordinates, radius],
          },
        };
      }
    }

    const services = await Service.find(query)
      .populate("providerId", "name profilePic experience")
      .sort({ createdAt: -1 });

    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// const getServices=async(req,res)=>{
//     try{
//         const { category, keyword, address, distance = 50 } = req.query;
//         let query = { isActive: true };

//     if (category) {
//       query.category = category;
//     }

//     if (keyword) {
//       query.title = { $regex: keyword, $options: 'i' };
//     }

//     // Geospatial search
//     if (address) {
//       const geoData = await geocodeAddress(address);
//       if (geoData) {
//         const radius = distance / 6378.1; // Convert distance to radians (earth radius ~ 6378.1 km)
//         query.location = {
//           $geoWithin: {
//             $centerSphere: [geoData.coordinates, radius]
//           }
//         };
//       }
//     }

//    const services = await Service.find(query).populate('providerId', 'name profilePic experience');

//     // Only return verified provider services
//     const verifiedServices = services.filter(service => service.providerId && service.isActive);

//     res.json(verifiedServices);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }

// @desc    Get service by ID
// @route   GET /api/services/:id
// @access  Public
 const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate('providerId', 'name profilePic experience skills');

    if (service) {
      res.json(service);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 const createService = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;


    const service = new Service({
      title,
      description,
      category,
      price,
      providerId: req.user._id,
      location: req.user.location, // Inherit location from provider profile
    });

    const createdService = await service.save();
    res.status(201).json(createdService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private/Provider
 const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (service) {
      // Check if user owns service
      if (service.providerId.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'User not authorized to update this service' });
      }

      service.title = req.body.title || service.title;
      service.description = req.body.description || service.description;
      service.category = req.body.category || service.category;
      service.price = req.body.price || service.price;
      service.isActive = req.body.isActive !== undefined ? req.body.isActive : service.isActive;

      const updatedService = await service.save();
      res.json(updatedService);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private/Provider
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (service) {
      if (service.providerId.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      await service.deleteOne();
      res.json({ message: 'Service removed' });
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const disableService=async(req,res)=>{
  try{
    const service =await Service.findById(req.params.id);
    if(service){
      if(service.providerId.toString()!==req.user._id.toString()){
        return res.status(401).json({message:'User not authorized'});
      } 
      service.isActive=false;
      res.json({message:"service Disabled"});
      await service.save()
    }
    else{
      res.status(404).json({message:'Service not found'});
    }
  }
  catch(err){
    res.status(500).json({message:err.message});
  }
}
module.exports={getServices,getServiceById,createService,updateService,deleteService,disableService};
