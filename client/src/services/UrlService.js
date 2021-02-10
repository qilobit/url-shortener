const baseApi = 'http://localhost:3000';
export class UrlService{
  async getUrl(id){
    try {
      const res = await fetch(`${baseApi}/${id}`);
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
      const res = await fetch(`${baseApi}/api/url/shorten`, {
        body: JSON.stringify({
          longUrl: longUrl
        }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
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
}