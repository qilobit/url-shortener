const baseApi = 'https://us-central1-pagueporver.cloudfunctions.net/app';
export class UrlService{
  async getUrl(id){
    try {
      const res = await fetch(`${baseApi}/one/${id}`);
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
      const res = await fetch(`${baseApi}/one`, {
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
        return jsonRes;
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