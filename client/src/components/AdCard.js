import React, { useEffect, useState } from 'react'
import { AdService } from '../services/AdService';
import Loader from './Loader';

const DEFAULT_URL = 'https://www.linkedin.com/pulse/after-publishing-50-articles-linkedin-ive-learned-tom-popomaronis';
const AdCard = () => {

  const [link, setLink] = useState('');
  const [media, setMedia] = useState('');
  const [_id, setId] = useState('');
  const [loading, setLoading] = useState(true);
  const service = new AdService();

  useEffect(async () => {

    const res = await service.getLast();
    if(res.ok){
      console.log('AD ', res);
      setMedia(service.getMediaUrl(res.ad.media));
      setLink(res.ad.link);
      setId(res.ad._id);
    }
    setLoading(false);

  }, []);

  const handleVisit = async () => {
    if(_id){
      service.countVisit(_id)
      .then(_ => console.log('OK'))
      .catch(e => console.error(e));
    }
  }
  return (
    loading 
    ? <Loader />
    : <div className="text-center">
      <a onClick={handleVisit} href={link} target="_blank" className="pointer">
        <img className="ad" src={media ? media : process.env.PUBLIC_URL +'/ad.png'} alt="Advertising"/>
      </a>
    </div>
       
  )
}

export default AdCard
