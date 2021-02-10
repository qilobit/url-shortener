const express = require('express');
const UrlService = require('../services/UrlService');
const router = express.Router();

router.post('/shorten', async (req, res) => {
	const { longUrl } = req.body;
	console.log('req.body ', req.body);
	const service = new UrlService();
	const response = await service.saveUrl(longUrl);
	if (response.ok) {
		return res.json(response.url);
	} else {
		console.log(response.message);
		res.sendStatus(400);
	}
});

module.exports = router;
