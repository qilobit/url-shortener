import { MediaService } from "./MediaService";

const Ad = require('../models/Ad');

export class AdService {
	constructor() {}
	async getAd(id: string) {
		const res = {
			ok: false,
			notfound: false,
			ad: null
		};
		const ad = await Ad.findById(id);
		if(ad){
			res.ad = ad;
			res.ok = true;
		}else{
			res.notfound = true;
		}
		return res;
	}

	async saveAd(name: string, link: string, imageFile: File, expirationDate?: string) {
		const response = {
			ok: false,
			message: '',
			ad: null
		};
		
		console.log('saveAd ', name, link);
    const mediaService = new MediaService();
    const img = await mediaService.uploadImage(imageFile);
    const newAd = new Ad({
      name,
      link,
      media: img._id,
      expirationDate
    });
    await newAd.save();  
    response.ad = newAd;
    response.ok = true;    
		return response;
	}

	async getLast() {
		const response = {
			ok: false,
			message: '',
			ad: {}
		};
    const result = await Ad.find().limit(1).sort('-createdAt');
    if(result.length && result.length > 0){
      response.ad = result[0];
      response.ok = true;
    }
		return response;
	}

}

