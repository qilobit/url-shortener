import * as mongoose from 'mongoose';

const adSquema = new mongoose.Schema({
	name: {
		type: String,
    maxlength: 70
	},
  link: {
    type: String,
    maxlength: 1000
  },
  clicksCount: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  media: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media',
    required: true
  },
  deleted: {
    type: Boolean,
    default: false
  },  
  expirationDate: {
    type: Date,
    // required: true
  },
	createdAt: {
		type: Date,
		default: Date.now
	},
});
module.exports = mongoose.model('Ad', adSquema);
