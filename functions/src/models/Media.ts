import * as mongoose from 'mongoose';

const mediaSquema = new mongoose.Schema({
  mediaType: {
    type: String,
    maxlength: 20
  },
  data: Buffer,
  contentType: {
    type: String,
    maxlength: 50
  },
	createdAt: {
		type: Date,
		default: Date.now
	},
});
module.exports = mongoose.model('Media', mediaSquema);
