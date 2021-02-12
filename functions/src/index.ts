import * as functions from "firebase-functions";
import * as mongoose from 'mongoose';
import * as express from 'express';
import * as cors from 'cors';
import { UrlService } from "./services/UrlService";
const expressApp = express();

expressApp.use(cors());

expressApp.get('/all-url', async (req: express.Request, res: express.Response) => {
  try {
    await getCon();
		const service = new UrlService();
		const response = await service.getAll();
		return res.json(response);
	} catch (e) {
		console.log(e.message);
    return res.status(500).json({message: e.message});
	}
});

expressApp.get('/url/:code', async (req: express.Request, res: express.Response) => {
  try {
    const {code} = req.params;
    await getCon();
		const service = new UrlService();
    const ip = String(req.headers['x-forwarded-for'] || req.connection.remoteAddress);
    console.log('Visit from ', ip);
		const response = await service.getUrl(code, ip);
    if(response.notfound){
      return res.status(404);
    }else{
      return res.json(response.url);
    }
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
    const {longUrl} = req.body;
    await getCon();
		const service = new UrlService();
		const response = await service.saveUrl(longUrl);
		return res.json(response);
	} catch (e) {
		console.log(e.message);
		return res.status(500).json({message: e.message});
	}
});

expressApp.post('/paste', async (req: express.Request, res: express.Response) => {
  try {
    const {content, password, isPrivate, expirationDate} = req.body;
    await getCon();
		const service = new UrlService();
		const response = await service.savePaste(content, password, isPrivate, expirationDate);
		return res.json(response);
	} catch (e) {
		console.log(e.message);
		return res.status(500).json({message: e.message});
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
    return res.status(500).json({message: e.message});
	}
});

export const app = functions.runWith({memory: '1GB'}).https.onRequest(expressApp);

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