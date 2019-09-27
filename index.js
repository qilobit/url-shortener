const express = require('express');
const connectDB = require('./config/db');
const app = express();
const PORT = 5000;
connectDB();
app.use(express.json({ extended: false }));
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
