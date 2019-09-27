const mongoose = require('mongoose');
//const config = require('çonfig');
//const db = config.get('mongoUrl');
const db = 'mongodb://localhost:27017/url_shortener';

const connectDB = async () => {
  try{
    await mongoose.connect(db, {
      useNewUrlParser: true
    });
    console.log('MongoDB connected...');
  }catch(e){
    console.error(e.message);
    process.exit(1);
  }
};

module.exports = connectDB;