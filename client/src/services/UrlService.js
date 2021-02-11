const baseApi = 'https://us-central1-pagueporver.cloudfunctions.net/app';
export class UrlService{
  async getUrl(id){
    try {
      const res = await fetch(`${baseApi}/url/${id}`);
      if(res.status === 200){
        const jsonRes = await res.json();
        return {
          ok: true,
          data: jsonRes
        }
      }else{
        console.log('err ', res.statusText);
        return {
          ok: false,
          data: res.statusText
        }
      }
    } catch (error) {
      console.log('err ', error);
      return {
        ok: false,
        data: error
      }
    }
  }
  async saveUrl(longUrl){
    try {
      return this.sendPost('url', {
        longUrl: longUrl
      });
    } catch (error) {
      console.log('err ', error);
      return {
        ok: false,
        data: error
      }
    }
  }
  async savePaste(content, password, isPrivate, expirationDate){
    try {
      return this.sendPost('paste', {
        content, 
        password, 
        isPrivate, 
        expirationDate
      });
    } catch (error) {
      console.log('err ', error);
      return {
        ok: false,
        data: error
      }
    }
  }
  async getPaste(id){
    try {
      const res = await fetch(`${baseApi}/paste/${id}`);
      if(res.status === 200){
        const jsonRes = await res.json();
        return {
          ok: true,
          data: jsonRes
        }
      }else{
        console.log('err ', res.statusText);
        return {
          ok: false,
          data: res.statusText
        }
      }
    } catch (error) {
      console.log('err ', error);
      return {
        ok: false,
        data: error
      }
    }
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
}