import * as mongoose from 'mongoose';

const urlVisitSquema = new mongoose.Schema({
	url: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Url'
	},
	ip: String,
	country: String,
	createdAt: {
		type: Date,
		default: Date.now
	},
});
module.exports = mongoose.model('UrlVisit', urlVisitSquema);
