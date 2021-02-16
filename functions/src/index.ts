// import * as functions from "firebase-functions";
import * as mongoose from 'mongoose';
import * as express from 'express';
import * as cors from 'cors';
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
import { UrlService } from "./services/UrlService";
import { AdService } from "./services/AdService";
import { MediaService } from './services/MediaService';
const expressApp = express();

expressApp.use(cors());
expressApp.use(
	bodyParser.urlencoded({
		extended: false
	})
);
expressApp.use(bodyParser.json());

expressApp.get('/all-url', async (req: express.Request, res: express.Response) => {
  try {
    await getCon();
		const service = new UrlService();
		const response = await service.getAll();
		return res.json(response);
	} catch (e) {
		console.log(e.message);
    return res.json({
      ok: false,
      message: e.message
    });
	}
});

expressApp.get('/url/:code', async (req: any, res: express.Response) => {
  try {
    const {code, ad=""} = req.params;
    await getCon();
		const service = new UrlService();
    const ip = String(req.headers['x-forwarded-for'] || req.connection.remoteAddress);
    console.log('==> Visit from ', ip);
		const response = await service.getUrl(code, ip, ad);
    return res.json(response);
	} catch (e) {
		console.log(e.message);
    return res.json({
      ok: false,
      message: e.message
    });
	}
});

expressApp.post('/url', async (req: express.Request, res: express.Response) => {
  try {
    const {longUrl, baseUrl} = req.body;
    await getCon();
		const service = new UrlService();
		const response = await service.saveUrl(longUrl, baseUrl);
		return res.json(response);
	} catch (e) {
		console.log(e.message);
    return res.json({
      ok: false,
      message: e.message
    });
	}
});

expressApp.post('/paste/like/:id', async (req: express.Request, res: express.Response) => {
  try {
    const {id} = req.params;
    await getCon();
		const service = new UrlService();
		const response = await service.likePaste(id);
		return res.json(response);
	} catch (e) {
		console.log(e.message);
    return res.json({
      ok: false,
      message: e.message
    });
	}
});

expressApp.post('/paste', async (req: express.Request, res: express.Response) => {
  try {
    const {title, content, password, isPrivate, expirationDate} = req.body;
    await getCon();
		const service = new UrlService();
		const response = await service.savePaste(title, content, password, isPrivate, expirationDate);
		return res.json(response);
	} catch (e) {
		console.log(e.message);
    return res.json({
      ok: false,
      message: e.message
    });
	}
});

expressApp.get('/paste/:id', async (req: express.Request, res: express.Response) => {
  try {
    const {id} = req.params;
    await getCon();
		const service = new UrlService();
		const response = await service.getPaste(id);
		return res.json(response);
	} catch (e) {
		console.log(e.message);
    return res.json({
      ok: false,
      message: e.message
    });
	}
});

expressApp.post('/ad', fileUpload({useTempFiles: true}), async (req: any, res: express.Response) => {
  try {
    console.log('==> req.body ', req.body);
    
    const {name, link, expirationDate} = req.body;
    if(!req.files || !req.files.media || !name || !link){
      return res.json({
        ok: false,
        message: 'Invalid params (name, link, media)'
      });
    }
    await getCon();
		const service = new AdService();
		const response = await service.saveAd(name, link, req.files.media, expirationDate);
		return res.json(response);
	} catch (e) {
		console.log(e.message);
    return res.json({
      ok: false,
      message: e.message
    });
	}
});

expressApp.get('/media/:id', async (req: express.Request, res: express.Response) => {
  try {
    const {id} = req.params;
    console.log('==> Get media ',id);
    
    await getCon();
		const service = new MediaService();
		const media = await service.getMedia(id);
    console.log('==> media.length ', media.length);
    
    res.writeHead(200, {
      'Content-Type': 'image/jpg',
      'Content-Length': media.length
    });
    return res.end(media);
	} catch (e) {
		console.log(e.message);
    return res.json({
      ok: false,
      message: e.message
    });
	}
});

expressApp.get('/ad/last', async (req: express.Request, res: express.Response) => {
  try {
    console.log('==> Get last ad ');
    
    await getCon();
		const service = new AdService();
		const ad = await service.getLast();
    
    return res.json(ad);
	} catch (e) {
		console.log(e.message);
    return res.json({
      ok: false,
      message: e.message
    });
	}
});

expressApp.put('/ad/visit/:id', async (req: express.Request, res: express.Response) => {
  try {
    const {id} = req.params;
    console.log('==> Add ad visit ', id);
    
    await getCon();
		const service = new AdService();
		const ad = await service.addOneVisit(id);
    
    return res.json(ad);
	} catch (e) {
		console.log(e.message);
    return res.json({
      ok: false,
      message: e.message
    });
	}
});

//addOneVisit

// export const app = functions.runWith({memory: '1GB'}).https.onRequest(expressApp);

expressApp.listen(3001, () => {
  console.log('Server running..');
  
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