const express = require('express');
const router = express.Router();
const {
  createBooking,
  getCustomerBookings,
  getProviderBookings,
  updateBookingStatus,
  getBookingById,
  cancelBooking,
} = require('../controllers/booking.controller');
const { auth, isCustomer, isProvider } = require('../middleware/auth.middleware');

router.post('/', [auth, isCustomer], createBooking);
router.get('/customer', [auth, isCustomer], getCustomerBookings);
router.get('/provider', [auth, isProvider], getProviderBookings);
router.patch('/:id/status', [auth, isProvider], updateBookingStatus);
router.patch('/:id/cancel', auth, cancelBooking);
router.get('/:id', auth, getBookingById);

module.exports = router;
