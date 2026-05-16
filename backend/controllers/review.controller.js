const mongoose = require('mongoose');
const Booking = require('../models/Booking.model');
const Review = require('../models/Review.model');
const Service = require('../models/Service.model');
const User = require('../models/User.model');

const createReview = async (req, res) => {
  try {
    const { bookingId, rating, comment } = req.body;
    const files = req.files || [];

    if (!bookingId || !rating ) {
      return res.status(400).json({ message: 'Booking, rating are required.' });
    }

    const numericRating = Number(rating);
    if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({ message: 'Rating must be an integer between 1 and 5.' });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    if (booking.customerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only review your own completed bookings.' });
    }

    if (booking.status !== 'completed') {
      return res.status(400).json({ message: 'Only completed bookings can be reviewed.' });
    }

    const existing = await Review.findOne({ bookingId: booking._id });
    if (existing) {
      return res.status(400).json({ message: 'A review has already been submitted for this booking.' });
    }

    const service = await Service.findById(booking.serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found for this booking.' });
    }

    const provider = await User.findById(booking.providerId);
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found for this booking.' });
    }

    const imagePaths = files.map((file) => `/uploads/${file.filename}`);

    const review = await Review.create({
      userId: req.user._id,
      providerId: booking.providerId,
      serviceId: booking.serviceId,
      bookingId: booking._id,
      rating: numericRating,
      comment,
      images: imagePaths,
    });

    booking.reviewed = true;
    await booking.save();

    const reviews=await Review.find({
        serviceId:booking.serviceId,
    })
    const total=reviews.reduce((sum,item)=>{
        return sum+item.rating;
    },0);

    const averageRating=total/reviews.length;

    await Service.findByIdAndUpdate(booking.serviceId,{
        averageRating:averageRating,
        numberOfReviews:reviews.length
    })

    res.status(201).json({
        success:true,
        message:'Review submitted successfully',
        review
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const files = req.files || [];

    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found.' });
    }

    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only edit your own reviews.' });
    }

    if (rating) {
      const numericRating = Number(rating);
      if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
        return res.status(400).json({ message: 'Rating must be an integer between 1 and 5.' });
      }
      review.rating = numericRating;
    }

    if (comment) {
      review.comment = comment;
    }

    if (files.length > 0) {
      const imagePaths = files.map((file) => `/uploads/${file.filename}`);
      review.images = review.images.concat(imagePaths);
    }

    await review.save();

    const reviews = await Review.find({
    serviceId: review.serviceId
    });

    const total = reviews.reduce((sum, item) => {
    return sum + item.rating;
    }, 0);

    const averageRating = total / reviews.length;

    await Service.findByIdAndUpdate(review.serviceId, {
    averageRating,
    numberOfReviews: reviews.length
    });

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found.' });
    }

    const isOwner = review.userId.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this review.' });
    }

    await review.remove();

    const booking = await Booking.findById(review.bookingId);
    if (booking) {
      booking.reviewed = false;
      await booking.save();
    }


        const reviews = await Review.find({
    serviceId: review.serviceId
    });

    const total = reviews.reduce((sum, item) => {
    return sum + item.rating;
    }, 0);

    const averageRating =
    reviews.length > 0
    ? total / reviews.length
    : 0;

    await Service.findByIdAndUpdate(review.serviceId, {
    averageRating,
    numberOfReviews: reviews.length
    });

    res.json({ message: 'Review removed successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getProviderReviews = async (req, res) => {
  try {
    const { providerId } = req.params;
    const { sortBy, minRating, hasImages, page = 1, limit = 10 } = req.query;
    const filters = { providerId };

    if (minRating) {
      filters.rating = { $gte: Number(minRating) };
    }
    if (hasImages === 'true') {
      filters.images = { $exists: true, $ne: [] };
    }

    let query = Review.find(filters)
      .populate('userId', 'name email phone')
      .populate('serviceId', 'title category price')
      .populate('providerId', 'name email phone');

    if (sortBy === 'rating') {
      query = query.sort({ rating: -1, createdAt: -1 });
    } else if (sortBy === 'helpful') {
      query = query.sort({ helpfulCount: -1, createdAt: -1 });
    } else {
      query = query.sort({ createdAt: -1 });
    }

    const skip = (Number(page) - 1) * Number(limit);
    const reviews = await query.skip(skip).limit(Number(limit));
    const total = await Review.countDocuments(filters);

    res.json({ total, page: Number(page), limit: Number(limit), reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProviderReviewSummary = async (req, res) => {
  try {
    const { providerId } = req.params;
    const provider = await User.findById(providerId).select('name email role');
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found.' });
    }

    const approvedReviews = await Review.find({ providerId });
    const totalReviews = approvedReviews.length;
    const averageRating =
      totalReviews > 0
        ? approvedReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        : 0;

    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    approvedReviews.forEach((review) => {
      breakdown[review.rating] += 1;
    });

    res.json({
      providerId,
      providerName: provider.name,
      averageRating: Number(averageRating.toFixed(2)),
      totalReviews,
      breakdown,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const getUserReviews = async (req, res) => {
//   try {
//     const { page = 1, limit = 10 } = req.query;
//     const skip = (Number(page) - 1) * Number(limit);

//     const reviews = await Review.find({ userId: req.user._id })
//       .populate('providerId', 'name email phone')
//       .populate('serviceId', 'title category price')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(Number(limit));

//     const total = await Review.countDocuments({ userId: req.user._id });

//     res.json({ total, page: Number(page), limit: Number(limit), reviews });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('userId', 'name email phone')
      .populate('providerId', 'name email phone')
      .populate('serviceId', 'title category price');

    if (!review) {
      return res.status(404).json({ message: 'Review not found.' });
    }

    const isParticipant =
      review.userId._id.toString() === req.user._id.toString() ||
      review.providerId._id.toString() === req.user._id.toString() ||
      req.user.role === 'admin';

    if (!isParticipant) {
      return res.status(403).json({ message: 'Access denied to this review.' });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReviewAnalytics = async (req, res) => {
  try {
    const totalReviews = await Review.countDocuments();

    const ratingAggregation = await Review.aggregate([
      { $match: {} },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalRatings: { $sum: 1 },
        },
      },
    ]);

    const topProviders = await Review.aggregate([
      { $match: {} },
      {
        $group: {
          _id: '$providerId',
          averageRating: { $avg: '$rating' },
          reviewCount: { $sum: 1 },
        },
      },
      { $sort: { averageRating: -1, reviewCount: -1 } },
      { $limit: 10 },
    ]);

    const topProvidersWithNames = await User.find({ _id: { $in: topProviders.map((item) => item._id) } }).select('name');
    const topProvidersMap = topProvidersWithNames.reduce((acc, provider) => {
      acc[provider._id.toString()] = provider.name;
      return acc;
    }, {});

    const topProvidersData = topProviders.map((provider) => ({
      providerId: provider._id,
      providerName: topProvidersMap[provider._id.toString()] || 'Unknown Provider',
      averageRating: Number(provider.averageRating.toFixed(2)),
      reviewCount: provider.reviewCount,
    }));

    const averageRating = ratingAggregation.length > 0 ? Number(ratingAggregation[0].averageRating.toFixed(2)) : 0;

    res.json({
      totalReviews,
      averageRating,
      topProviders: topProvidersData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createReview,
  editReview,
  deleteReview,
  getProviderReviews,
  getProviderReviewSummary,
  getReviewById,
  getReviewAnalytics,
};
