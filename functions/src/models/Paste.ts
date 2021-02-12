import * as mongoose from 'mongoose';

const pasteSquema = new mongoose.Schema({
	createdAt: {
		type: Date,
		default: Date.now
	},
	viewsCount: {
		type: Number,
		default: 0
	},
	password: {
    type: String
  },
  isPrivate: {
    type: Boolean,
    default: false
  },
  expirationDate: {
    type: Date,
    default: null
  },
  expired: {
    type: Boolean,
    default: false
  },
  content: {
    type: String,
    maxlength: 5000
  }
});
module.exports = mongoose.model('Paste', pasteSquema);
