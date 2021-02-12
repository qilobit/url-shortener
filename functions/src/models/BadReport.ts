import * as mongoose from 'mongoose';

//sources: url,paste

const badReportSchema = new mongoose.Schema({
	targetId: String,
  source: {
    type: String,
    maxlength: 20
  },
  fromIp: String,
	date: {
		type: Date,
		default: Date.now
	},
  user: {
    type: String
  }
});
module.exports = mongoose.model('BadReport', badReportSchema);
