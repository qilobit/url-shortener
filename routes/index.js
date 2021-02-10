const express = require('express');
const router = express.Router();
const UrlService = require('../services/UrlService');

router.get('/all', async (req, res) => {
	try {
		const service = new UrlService();
		const response = await service.getAll();
		if (response.ok) {
			return res.json(response.urls);
		} else {
			return res.sendStatus(404);
		}
	} catch (e) {
		console.log(e.message);
		return res.sendStatus(500);
	}
});


router.get('/:code', async (req, res) => {
	try {
		const code = req.params.code;
		const service = new UrlService();
		const response = await service.getUrl(code, req.ip);
		if (response.ok) {
			console.log('==> URL FOUND ', response.url._id);
			return res.json(response.url);
		} else {
			return res.sendStatus(404);
		}
	} catch (e) {
		console.log(e.message);
		return res.sendStatus(500);
	}
});

module.exports = router;
