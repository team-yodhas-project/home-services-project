var User=require('../models/user.model');


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


// @desc    Verify provider
// @route   PUT /api/users/:id/verify
// @access  Private/Admin

const verifyProvider=async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        
        if (user && user.role === 'provider') {
      user.isVerified = true;
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'Provider not found or not a provider' });
    }
    
    }
    catch (error) {
    res.status(500).json({ message: error.message });
    }
}

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.deleteOne();
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports={getUsers,verifyProvider,deleteUser}