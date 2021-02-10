const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config.json');
const app = express();
const _l = console.log;
app.use(cors({
	origin: '*',
}));

app.use(express.json({ extended: false }));
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

mongoose.connection.openUri(
	config.db.url,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	},
	(err, conn) => {
		if (err) {
			_l('ERROR ON DB CONECTION: ', err);
		} else {
			app.listen(config.app_port, () => {
				_l(`SERVER STARTED ON PORT ${config.app_port}`);
			});
		}
	}
);
