import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a service title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: ['Cleaning', 'Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Appliance Repair', 'Other'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a base price'],
    },
    providerId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        index: '2dsphere',
      },
      address: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);

serviceSchema.index({ location: '2dsphere' });

const Service = mongoose.model('Service', serviceSchema);
export default Service;
