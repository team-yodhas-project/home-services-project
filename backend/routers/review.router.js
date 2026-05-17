var express = require('express');
var router = express.Router();
const upload = require('../middleware/upload.middleware');
const { auth, isCustomer, isProvider } = require('../middleware/auth.middleware');
const {
  createReview,
  editReview,
  deleteReview,
  getProviderReviews,
  getProviderReviewSummary,
  getReviewById,
  getReviewAnalytics,
  getServiceReviews
} = require('../controllers/review.controller');

router.post('/', [auth, isCustomer, upload.array('images', 5)], createReview);
router.patch('/editReview/:id', [auth, isCustomer, upload.array('images', 5)], editReview);
router.delete('/deleteReview/:id', auth, deleteReview);
router.get('/provider/:providerId/summary', getProviderReviewSummary);
router.get('/provider/:providerId', getProviderReviews);
router.get('/getReviewById/:id', auth, getReviewById);
router.get('/analytics', auth, getReviewAnalytics);
router.get('/service/:serviceId', getServiceReviews);

module.exports = router;
