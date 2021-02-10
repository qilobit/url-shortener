import firebase from 'firebase/app';
export class UrlService{
  async getUrl(id){
    try {
      const _fun = this.getCallableFunction('getOneUrl');
      const res = await _fun({code: id});
      return res.data;
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
      const _fun = this.getCallableFunction('saveOneUrl');
      const res = await _fun({longUrl: longUrl});
      return res.data;
    } catch (error) {
      console.log('err ', error);
      return {
        ok: false,
        data: error
      }
    }
  }

  async getAll(){
    try {
      const _fun = this.getCallableFunction('getAllUrls');
      const res = await _fun({});
      return res.data;
    } catch (error) {
      console.log('err ', error);
      return {
        ok: false,
        data: error
      }
    }
  }

  getCallableFunction(name){
    return firebase.functions().httpsCallable(name);
  }
}