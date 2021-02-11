const shortid = require('shortid');
const validUrl = require('valid-url');
const Url = require('../models/Url');
const Paste = require('../models/Paste');
const UrlVisit = require('../models/UrlVisit');

export class UrlService {
	constructor() {}
	async getUrl(code: string, ip: string) {
		const url = await Url.findOne({ urlCode: code });
		url.viewsCount++;
		const savedData = await url.save();
		const newVisit = new UrlVisit();
		newVisit.url = url._id;
		newVisit.visitorIp = ip;
		await newVisit.save();
		return savedData;
	}

	async updateActualVisits(_id: string) {
		const response = {
			ok: false,
			message: '',
			url: null
		};
		try {
			const url = await Url.findById(_id);
			if (url) {
				url.actualVisits++;
				const savedData = await url.save();
				response.ok = true;
				response.url = savedData;
			} else {
				response.message = 'URL not found';
			}
		} catch (error) {
			console.log('==> ERR ', error);
			response.message = error.message;
		}
		return response;
	}

	async saveUrl(longUrl: string) {
		const response = {
			ok: false,
			message: '',
			url: null
		};
		const baseUrl = 'http://localhost:3000'; //TODO change this
		const urlCode = shortid.generate();
		
		console.log('longUrl ', longUrl);
		console.log('urlCode ', urlCode);

		if (validUrl.isUri(longUrl)) {
			try {
				let url = await Url.findOne({ longUrl });
				if (url) {
					response.url = url;
					response.ok = true;
				} else {
					const shortUrl = `${baseUrl}/${urlCode}`;
					url = new Url({
						longUrl,
						shortUrl,
						urlCode,
						date: new Date()
					});
					await url.save();
					response.url = url;
					response.ok = true;
				}
			} catch (e) {
				console.log(e.message);
				response.message = e.message;
			}
		} else {
			response.message = 'Invalid URL';
		}
		return response;
	}

	async getAll() {
		const response = {
			ok: false,
			message: '',
			urls: null
		};
		try {
			const urls = await Url.find();
			if (urls) {
				response.ok = true;
				response.urls = urls;
			} else {
				response.message = 'No urls found';
			}
		} catch (error) {
			console.log('==> ERR ', error);
			response.message = error.message;
		}
		return response;
	}

	async savePaste(content: string, password?: string, isPrivate: Boolean=false, expirationDate?: string,){
		const response = {
			ok: false,
			message: '',
			paste: null
		};

		try {

			const paste = new Paste({
				content,
				isPrivate,
				password: password ? password : null,
				expirationDate: expirationDate ? expirationDate : null
			});
			await paste.save();
			response.paste = paste;
			response.ok = true;
			
		} catch (e) {
			console.log(e.message);
			response.message = e.message;
		}

		return response;
	}

	async getPaste(id: string) {
		const paste = await Paste.findById(id);
		paste.viewsCount++;
		const savedData = await paste.save();
		return savedData;
	}

}

