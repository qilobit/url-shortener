import React, {useRef, useState} from 'react'
import { UrlService } from '../services/UrlService';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
const MAX_LENGTH = 1000;

const CreatePastePage = () => {
  const [pastContent, setpastContent] = useState('');
  const [title, setTitle] = useState('');
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState(false);
  const [newCode, setnewCode] = useState('');
  const [remaininChars, setremaininChars] = useState(0);
  const [expiration, setexpiration] = useState('');
  const [password, setpassword] = useState('');
  const service = new UrlService();
  const contentElmentRef = useRef(null);
  const titleElementRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(title === ''){
      titleElementRef.current.focus();
      return;
    }
    if(pastContent === ''){
      contentElmentRef.current.focus();
      return;
    }
    setloading(true);
    const res = await service.savePaste(
      title,
      pastContent,
      password,
      false,//isPrivate
      expiration
    );
    console.log('res ', res);
    if(res.ok){
      setsuccess(true);
      setnewCode(res.paste?._id);
      seterror('');
    }else{
      seterror(res.message);
    }
    setloading(false);
    
  };
  const handleChange = (e) => {
    setpastContent(e.target.value);
    setremaininChars(pastContent.length === 0 ? 0 : pastContent.length);
  };
  return (
    <div className="container">
      <h4>Create a paste</h4>
      <form onSubmit={handleSubmit} className="my-2">
        <div className="form-group">
          <label htmlFor="paste-title">Title</label>
          <input 
            ref={titleElementRef}
            value={title}
            maxLength="100"
            onChange={(e) => setTitle(e.target.value)}
            type="text" 
            id="paste-title" 
            className="form-control"/>
        </div>
        <div className="form-group">
          <label htmlFor="paste-content">Content</label>
          <textarea
            id="paste-content"
            ref={contentElmentRef}
            disabled={loading}
            value={pastContent} 
            onChange={handleChange}
            onKeyUp={handleChange}
            cols="25"
            rows="10"
            className="form-control mt-2" 
            maxLength={MAX_LENGTH}>
          </textarea>
        </div>
        <div className="text-right">{remaininChars}/{MAX_LENGTH}</div>

        <div className="row mb-2">
          <div className="col-sm-6">
            <label htmlFor="pass">Password protected <b>(Most be logged)</b></label>
            <input 
              disabled={loading}
              value={password} 
              onChange={(e) => setpassword(e.target.value)}
              className="form-control" 
              id="pass" 
              placeholder="password" 
              type="text"/>
          </div>
          <div className="col-sm-6">
            <label htmlFor="exp-date">Expiration date</label>
            <input 
              disabled={loading}
              type="date" 
              value={expiration} 
              onChange={(e) => setexpiration(e.target.value)}
              id="exp-date" 
              className="form-control" />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 text-left">
            {loading && <Loader />}
          </div>
          <div className="col-sm-6 text-right">
            <button disabled={loading} className="btn btn-primary">
              {loading ? 'Wait..' : 'Create paste'}
            </button>
          </div>
        </div>      
      </form>

      {error && <Alert type="danger" content={error}/>}
      {success && <div className="alert alert-success break-word">Paste saved! <a target="_blank" href={`${window.location.origin}/paste/${newCode}`}><strong>{`${window.location.origin}/paste/${newCode}`}</strong></a></div>}

    </div>
  )
}

export default CreatePastePage
