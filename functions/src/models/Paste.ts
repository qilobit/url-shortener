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
  title: {
    type: String,
    maxlength: 100,
    required: true
  },
  content: {
    type: String,
    maxlength: 5000,
    required: true
  },
  likesCount: {
		type: Number,
		default: 0
	}
});
module.exports = mongoose.model('Paste', pasteSquema);
