import React, {useState} from 'react'
import { UrlService } from '../services/UrlService';

const CreateUrlPage = () => {
  const [urlData, seturlData] = useState('');
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState(false);
  const [newCode, setnewCode] = useState('')
  const service = new UrlService();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(urlData !== ''){
      setloading(true);
      const res = await service.saveUrl(urlData);
      console.log('res ', res);
      if(res.ok){
        setsuccess(true);
        setnewCode(res.data.shortUrl);
        seterror('');
      }else{
        seterror(res.data);
      }
      setloading(false);

    }
  };

  return (
    <div className="container">
      <h2>Create URL</h2>

      <form onSubmit={handleSubmit}>
        <p>
          <input
            disabled={loading}
            value={urlData} 
            onChange={(e) => seturlData(e.target.value)}
            className="form-control my-2" 
            placeholder="www.example.com" />
          <button disabled={loading} className="btn btn-primary">
            {loading ? 'Wait..' : 'Short it'}
          </button>
        </p>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">Url saved! <strong>{newCode}</strong></div>}

    </div>
  )
}

export default CreateUrlPage
