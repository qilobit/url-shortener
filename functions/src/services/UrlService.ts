const shortid = require('shortid');
const validUrl = require('valid-url');
const Url = require('../models/Url');
const Paste = require('../models/Paste');
const UrlVisit = require('../models/UrlVisit');

export class UrlService {
	constructor() {}
	async getUrl(code: string, ip: string, adId: string) {
		const res = {
			ok: false,
			notfound: false,
			url: null
		};
		const url = await Url.findOne({ urlCode: code });
		if(url){
			url.viewsCount++;
			const savedData = await url.save();
			const newVisit = new UrlVisit();
			newVisit.url = url._id;
			newVisit.ip = ip;
			newVisit.country = '';
			newVisit.ad = adId;
			await newVisit.save();
			res.url = savedData;
			res.ok = true;
		}else{
			res.notfound = true;
		}
		return res;
	}

	async updateActualVisits(_id: string) {
		const response = {
			ok: false,
			notfound: false,
			url: null
		};
		const url = await Url.findById(_id);
		if (url) {
			url.actualVisits++;
			const savedData = await url.save();
			response.ok = true;
			response.url = savedData;
		} else {
			response.notfound = true;
		}
		return response;
	}

	async saveUrl(longUrl: string, baseUrl: string) {
		const response = {
			ok: false,
			message: '',
			url: null
		};
		const urlCode = await this.getUniqueCode();
		
		console.log('longUrl ', longUrl);
		console.log('urlCode ', urlCode);

		if (validUrl.isUri(longUrl)) {
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
		response.urls = await Url.find().sort('-viewsCount');
		response.ok = true;
		return response;
	}

	async savePaste(title: string, content: string, password?: string, isPrivate: Boolean=false, expirationDate?: string,){
		const response = {
			ok: false,
			paste: null
		};

		const paste = new Paste({
			title,
			content,
			isPrivate,
			password: password ? password : null,
			expirationDate: expirationDate ? expirationDate : null
		});
		await paste.save();
		response.paste = paste;
		response.ok = true;

		return response;
	}

	async getPaste(id: string) {
		const res = {
			ok: false,
			notfound: false,
			url: null
		};
		const paste = await Paste.findById(id);
		if(paste){
			paste.viewsCount++;
			res.url = await paste.save();
			res.ok = true;
		}else{
			res.notfound = true;
		}
		return res;
	}

	async likePaste(id: string){
		const res = {
			ok: false,
			message: 'success'
		};
		const paste = await Paste.findById(id);
		if(paste){
			paste.likesCount++;
			await paste.save();
			res.ok = true;
		}else{
			res.message = 'Not found';
		}
		return res;
	}

	async getUniqueCode(): Promise<string>{
		const code = shortid.generate();
		const exists = await Url.findOne({ urlCode: code });
		if(exists){
			return this.getUniqueCode();
		}
		return code;
	}
}

