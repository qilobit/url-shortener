const mongoose = require('mongoose');
const urlVisitSquema = new mongoose.Schema({
	url: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Url'
    },
    visitorIp: String,
	date: {
		type: Date,
		default: Date.now
	},
});
module.exports = mongoose.model('UrlVisit', urlVisitSquema);
