import * as mongoose from 'mongoose';

const userSquema = new mongoose.Schema({
	name: {
		type: String,
    maxlength: 70
	},
  email: {
    type: String,
    maxlength: 150
  },
  password: {
    type: String,
    maxlength: 70
  },
	date: {
		type: Date,
		default: Date.now
	},
});
module.exports = mongoose.model('User', userSquema);
