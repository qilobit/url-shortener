import React, {useRef, useState} from 'react'
import { UrlService } from '../services/UrlService';
import './CreateUrl.css';
const CreateUrlPage = () => {
  const [urlData, seturlData] = useState('');
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState(false);
  const [shortUrl, setShortUrl] = useState('')
  const service = new UrlService();
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(urlData !== ''){
      setloading(true);
      const res = await service.saveUrl(urlData);
      console.log('res ', res);
      if(res.ok){
        setsuccess(true);
        setShortUrl(res.url.shortUrl);
        seterror('');
      }else{
        seterror(res.message);
      }
      setloading(false);
    }else{
      inputRef.current.focus();
    }
  };

  return (
    <div className="container mt-2">
      <h4>Create URL</h4>

      <form onSubmit={handleSubmit}>
        <div className="url-create-wraper">
          <input
            ref={inputRef}
            disabled={loading}
            value={urlData} 
            onChange={(e) => seturlData(e.target.value)}
            className="form-control my-2" 
            placeholder="www.example.com" />
          <button disabled={loading} className="btn btn-primary">
            {loading ? 'Wait..' : 'Short it'}
          </button>
        </div>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">Url saved! <a target="_blank" href={`${shortUrl}`}><strong>{`${shortUrl}`}</strong></a></div>}

    </div>
  )
}

export default CreateUrlPage
