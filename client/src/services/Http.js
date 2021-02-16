//prod url https://us-central1-pagueporver.cloudfunctions.net/app
//dev url http://localhost:5001/pagueporver/us-central1/app
export class Http{
  baseApi = 'http://localhost:3001';
  async post(url, body, headers){
    headers = headers || {'Content-Type': 'application/json'};
    const res = await fetch(`${this.baseApi}/${url}`, {
      body: body,
      method: 'POST',
      headers: headers
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
  async get(url){
    const res = await fetch(`${this.baseApi}/${url}`, {
      method: 'GET',
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
  async put(url, body){
    const res = await fetch(`${this.baseApi}/${url}`, {
      body: body,
      method: 'PUT',
      headers: {'Content-Type': 'application/json'}
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