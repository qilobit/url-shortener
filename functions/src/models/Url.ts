import * as mongoose from 'mongoose';

const urlSquema = new mongoose.Schema({
	urlCode: String,
	longUrl: {
		type: String,
    maxlength: 500
	},
	shortUrl: String,
	date: {
		type: Date,
		default: Date.now
	},
	viewsCount: {
		type: Number,
		default: 0
	},
	likesCount: {
		type: Number,
		default: 0
	},
	actualVisitsCount: {
		type: Number,
		default: 0
	},
	expirationDate: {
    type: Date,
    default: null
  },
  expired: {
    type: Boolean,
    default: false
  },
});
module.exports = mongoose.model('Url', urlSquema);
