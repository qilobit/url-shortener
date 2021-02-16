import { Http } from "./Http";

export class AdService extends Http{
  getLast(){
    return this.get(`ad/last`);
  }

  getMediaUrl(id){
    return `${this.baseApi}/media/${id}`;
  }

  async saveAd(name, link, file){
    const fData = new FormData();

    fData.append('name', name);
    fData.append('link', link);
    fData.append('media', file);

    const res = await fetch(`${this.baseApi}/ad`, {
      body: fData,
      method: 'POST',
    });
    return res.json();
  }

  countVisit(id){
    return this.put(`ad/visit/${id}`);
  }
}