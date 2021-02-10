import React, {useState} from 'react'
import { UrlService } from '../services/UrlService';
const MAX_LENGTH = 300;

const CreatePastePage = () => {
  const [pastContent, setpastContent] = useState('');
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState(false);
  const [newCode, setnewCode] = useState('');
  const [remaininChars, setremaininChars] = useState(0)
  const service = new UrlService();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(pastContent !== ''){
      setloading(true);
      const res = await service.saveUrl(pastContent);
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
  const handleChange = (e) => {
    setpastContent(e.target.value);
    setremaininChars(pastContent.length === 0 ? 0 : (pastContent.length + 1));
  };

  return (
    <div className="container">
      <h4>Content <small>(Can include HTML)</small></h4>
      <form onSubmit={handleSubmit}>
        <p>
          <textarea
            disabled={loading}
            value={pastContent} 
            onChange={handleChange}
            onKeyUp={handleChange}
            cols="25"
            rows="10"
            className="form-control mt-2" 
            maxLength={MAX_LENGTH}>
          </textarea>
          <div className="text-right mb-2">{remaininChars}/{MAX_LENGTH}</div>
          <button disabled={loading} className="btn btn-primary">
            {loading ? 'Wait..' : 'Save'}
          </button>
        </p>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">Paste saved! <strong>{newCode}</strong></div>}

    </div>
  )
}

export default CreatePastePage
