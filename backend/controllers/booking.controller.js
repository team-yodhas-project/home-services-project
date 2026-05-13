const Booking = require('../models/Booking.model');
const Service = require('../models/Service.model');

const createBooking = async (req, res) => {
  try {
    const { serviceId, bookingDate, timeSlot, address, notes } = req.body;

    if (!serviceId || !bookingDate || !timeSlot || !address) {
      return res.status(400).json({ message: 'Service, date, time slot, and address are required.' });
    }

    const service = await Service.findById(serviceId);
    if (!service || !service.isActive) {
      return res.status(404).json({ message: 'Service not found or not currently available.' });
    }

    const booking = await Booking.create({
      customerId: req.user._id,
      providerId: service.providerId,
      serviceId,
      bookingDate,
      timeSlot,
      address,
      notes,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCustomerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customerId: req.user._id })
      .populate('serviceId', 'title price category')
      .populate('providerId', 'name email phone')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProviderBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ providerId: req.user._id })
      .populate('serviceId', 'title price category')
      .populate('customerId', 'name email phone')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['accepted', 'on_the_way', 'rejected', 'completed'];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Use accepted, on_the_way, rejected, or completed.' });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    if (booking.providerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to update this booking.' });
    }

    if (status === 'accepted' || status === 'rejected') {
      if (booking.status !== 'pending') {
        return res.status(400).json({ message: `Only pending bookings can be ${status}.` });
      }
    }

    if (status === 'on_the_way' && booking.status !== 'accepted') {
      return res.status(400).json({ message: 'Only accepted bookings can be marked on the way.' });
    }

    if (status === 'completed' && booking.status !== 'on_the_way' && booking.status !== 'accepted') {
      return res.status(400).json({ message: 'Only accepted or on_the_way bookings can be marked completed.' });
    }

    booking.status = status;
    await booking.save();
    const updatedBooking = await Booking.findById(req.params.id)
      .populate('serviceId', 'title price category')
      .populate('customerId', 'name email phone')
      .populate('providerId', 'name email phone');

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('serviceId', 'title price category description')
      .populate('customerId', 'name email phone')
      .populate('providerId', 'name email phone');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    const userId = req.user._id.toString();
    const isParticipant =
      booking.customerId._id.toString() === userId || booking.providerId._id.toString() === userId;

    if (!isParticipant) {
      return res.status(403).json({ message: 'Access denied to this booking.' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    const userId = req.user._id.toString();
    const isCustomer = booking.customerId.toString() === userId;
    const isProvider = booking.providerId.toString() === userId;

    if (!isCustomer && !isProvider) {
      return res.status(403).json({ message: 'You are not authorized to cancel this booking.' });
    }

    // Cannot cancel completed, rejected, or already cancelled bookings
    if (['completed', 'rejected', 'cancelled'].includes(booking.status)) {
      return res.status(400).json({ message: `Cannot cancel a ${booking.status} booking.` });
    }

    booking.status = 'cancelled';
    await booking.save();

    const updatedBooking = await Booking.findById(req.params.id)
      .populate('serviceId', 'title price category')
      .populate('customerId', 'name email phone')
      .populate('providerId', 'name email phone');

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getCustomerBookings,
  getProviderBookings,
  updateBookingStatus,
  getBookingById,
  cancelBooking,
};