import { Http } from './Http';
export class UrlService extends Http{
  async getUrl(id){
    return this.get(`url/${id}`);
  }
  async saveUrl(longUrl){
    return this.post('url', JSON.stringify({
      longUrl: longUrl,
      baseUrl: window.location.origin
    }));
  }
  async savePaste(title, content, password, isPrivate, expirationDate){
    return this.post('paste', JSON.stringify({
      title,
      content, 
      password, 
      isPrivate, 
      expirationDate
    }));
  }
  async getPaste(id){
    return this.get(`paste/${id}`);
  }
  async likePaste(id){
    return this.post(`paste/like/${id}`, {});
  }
  async getAllUrl(){
    return this.get(`all-url`);
  }
}