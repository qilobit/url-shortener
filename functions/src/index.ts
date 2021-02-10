import * as functions from "firebase-functions";
import * as mongoose from 'mongoose';
import { UrlService } from "./services/UrlService";

// const config = require('./config.json');

export const getAllUrls = functions.https.onCall(async (data, context) => {
  // if(!context.auth){
  //   return {
  //     ok: false,
  //     message: 'Not authorized'
  //   };
  // }
  try {
    await getCon();
		const service = new UrlService();
		const response = await service.getAll();
		return response;
	} catch (e) {
		console.log(e.message);
		throw new functions.https.HttpsError('aborted', e.message);
	}

});

export const getOneUrl = functions.https.onCall(async (data, context) => {
  // if(!context.auth){
  //   return {
  //     ok: false,
  //     message: 'Not authorized'
  //   };
  // }
  try {
    const {code} = data;
    await getCon();
		const service = new UrlService();
		const response = await service.getUrl(code, context.rawRequest.ip);
		return response;
	} catch (e) {
		console.log(e.message);
		throw new functions.https.HttpsError('aborted', e.message);
	}

});

export const saveOneUrl = functions.https.onCall(async (data, context) => {
  // if(!context.auth){
  //   return {
  //     ok: false,
  //     message: 'Not authorized'
  //   };
  // }
  try {
    const {longUrl} = data;
    await getCon();
		const service = new UrlService();
		const response = await service.saveUrl(longUrl);
		return response;
	} catch (e) {
		console.log(e.message);
		throw new functions.https.HttpsError('aborted', e.message);
	}

});

function getCon(){
  return new Promise((resolve, reject) => {
    mongoose.connection.openUri(
      'mongodb+srv://admin1:sliceoflif3@hsbg-orl-db-ntkvn.mongodb.net/url_shortener?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      },
      (err: any, conn: any) => {
        if (err) {
          console.log('ERROR ON DB CONECTION: ', err);
          reject('Can not connect to DB');
        } 
        resolve(conn);
      }
    );
  });
}