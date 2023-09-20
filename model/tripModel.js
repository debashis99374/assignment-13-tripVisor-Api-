const mongoose = require('mongoose');


const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  location: {
    city: String,
    country: String,
  },
  description: String,
  rating: {
    type: Number,
    default: 0, 
    max:10,
    min:0
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true, 
      },
      text: String,
    },
  ],
});


const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;
