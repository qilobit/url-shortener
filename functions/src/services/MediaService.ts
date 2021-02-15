import { readFileSync,unlinkSync } from 'fs';
const Media = require('../models/Media');

export class MediaService{
  async uploadImage(file: File){
    const image = new Media();
    image.data = this.createBufferFromFile(file);
    image.contentType = file.type;
    return await image.save();
  }

  private createBufferFromFile(file: any) {
    const buff = readFileSync(file.tempFilePath);
    unlinkSync(file.tempFilePath);
    return buff;
  }

  async getMedia(mediaId: string){
    const media = await Media.findById(mediaId);
    const img = Buffer.from(media.data, 'base64');
    return img;
  }
}