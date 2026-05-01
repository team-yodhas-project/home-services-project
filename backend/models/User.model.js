var mongoose=require('mongoose');

var userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        enum:['customer','provider','admin'],
        default:'customer'
    },
    profilePic: {
    type: String,
    default: ""
  },
   skills: {
    type: [String],
    default: []
  },

  experience: {
    type: Number,
    default: 0
  },

  location: {
    type: {
      type: String,
      default: "Point"
    },
    coordinates: [Number] // used for location-based UI search
  },

  isVerified: {
    type: Boolean,
    default: false
  }

}, { timestamps: true})
module.exports=mongoose.model('User',userSchema);