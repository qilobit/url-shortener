const mongoose = require('mongoose');
const urlSquema = new mongoose.Schema({
	urlCode: String,
	longUrl: String,
	shortUrl: String,
	date: {
		type: Date,
		default: Date.now
	},
	views: [
		{
			ip: String,
			date: {
				type: Date,
				default: Date.now
			}
		}
	],
	viewsCount: {
		type: Number,
		default: 0
	},
	actualVisitsCount: {
		type: Number,
		default: 0
	}
});
module.exports = mongoose.model('Url', urlSquema);
