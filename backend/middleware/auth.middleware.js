const jwt=require('jsonwebtoken');
const User=require('../models/User.model');

 const auth=async(req,res,next)=>{
    const token=req.header('x-auth-token');

    if(!token){
        return res.status(401).json({msg:"No token, authorization denied"});
    }


    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET || "evarkicheppaku");
        req.user=await User.findById(decoded.id).select('-password');
        next();
    } catch (err) {
        res.status(401).json({msg:"Token is not valid"});
    }
};

 const isCustomer=async(req,res,next)=>{
    try{
        const user=await User.findById(req.user.id);
        if(user && user.role ==='customer'){
            next();
        }
        else{
            return res.status(403).json({msg:"Access denied, not a customer"});
        }
    } catch (err) {
        res.status(500).json({msg:"Server error"});
    }
};


const isProvider=async(req,res,next)=>{
    try{
        const user=await User.findById(req.user.id);
        if(user && user.role==='provider'){
            next();
        }
        else{
            return res.status(403).json({msg:"Access denied, not a provider"});
        }
    } catch (err) {
        res.status(500).json({msg:"Server error"});
    }
};

 const isAdmin=async(req,res,next)=>{
    try{
        const user=await User.findById(req.user.id);
        if(user && user.role==='admin'){
            next();
        }
        else{
            return res.status(403).json({msg:"Access denied, not an admin"});
        }
    }
    catch(err){
        res.status(500).json({msg:"Server error"});
    }
}

// const isProviderOrAdmin=async(req,res,next)=>{
//     try{
//         const user=await User.findById(req.user.id);
//         if(user && (user.role==='provider' || user.role==='admin')){
//             next();
//         }
//         else{
//             return res.status(403).json({msg:"Access denied, must be provider or admin"});
//         }
//     }
//     catch(err){
//         res.status(500).json({msg:"Server error"});
//     }
// }

module.exports={auth,isCustomer,isProvider,isAdmin};