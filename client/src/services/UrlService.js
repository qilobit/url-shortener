const baseApi = 'https://us-central1-pagueporver.cloudfunctions.net/app';
//prod url https://us-central1-pagueporver.cloudfunctions.net/app
//dev url http://localhost:5001/pagueporver/us-central1/app
export class UrlService{
  async getUrl(id){
    const res = await fetch(`${baseApi}/url/${id}`);
    const jsonRes = await res.json();
    return jsonRes;
  }
  async saveUrl(longUrl){
    return this.sendPost('url', {
      longUrl: longUrl,
      baseUrl: window.location.origin
    });
  }
  async savePaste(title, content, password, isPrivate, expirationDate){
    return this.sendPost('paste', {
      title,
      content, 
      password, 
      isPrivate, 
      expirationDate
    });
  }
  async getPaste(id){
    const res = await fetch(`${baseApi}/paste/${id}`);
    const jsonRes = await res.json();
    return jsonRes;
  }
  async sendPost(url, body){
    const res = await fetch(`${baseApi}/${url}`, {
      body: JSON.stringify(body),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if(res.status === 200){
      const jsonRes = await res.json();
      return jsonRes;
    }else{
      console.log(`ERR [${res.status}]`, res.statusText);
      return {
        ok: false,
        data: res.statusText
      }
    }
  }
  async likePaste(id){
    return this.sendPost(`paste/like/${id}`, {});
  }
}