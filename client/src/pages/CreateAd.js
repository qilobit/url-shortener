import React, {useRef, useState} from 'react'
import { AdService } from '../services/AdService';
import Loader from '../components/Loader';
import Alert from '../components/Alert';

const CreateAdPage = () => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [file, setFile] = useState(null);

  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState(false);

  const service = new AdService();
  const linkElmentRef = useRef(null);
  const nameElementRef = useRef(null);

  const handleFile = (e) => {
    if(e.target.files && e.target.files[0]){
      setFile(e.target.files[0]);
      console.log(file);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(name === ''){
      nameElementRef.current.focus();
      return;
    }
    if(link === ''){
      linkElmentRef.current.focus();
      return;
    }
    setloading(true);
    const res = await service.saveAd(
      name,
      link,
      file,
      expirationDate,
    );
    console.log('res ', res);
    if(res.ok){
      setsuccess(true);
      seterror('');
    }else{
      seterror(res.message);
    }
    setloading(false);
    
  };
  return (
    <div className="container mt-2">
      <h4>Create an Ad</h4>
      <form onSubmit={handleSubmit} className="my-2">
        <div className="form-group">
          <label htmlFor="paste-title">Name</label>
          <input 
            ref={nameElementRef}
            value={name}
            maxLength="100"
            onChange={(e) => setName(e.target.value)}
            type="text" 
            id="paste-title" 
            className="form-control"
            maxLength="70"/>
        </div>
        <div className="form-group">
          <label htmlFor="paste-content">Action link</label>
          <input
            type="text"
            id="paste-content"
            ref={linkElmentRef}
            disabled={loading}
            value={link} 
            onChange={(e) => setLink(e.target.value)}
            className="form-control mt-2" 
            maxLength="300"/>
        </div>
        <div className="row mb-2">
          <div className="col-sm-6">
            <label htmlFor="pass">Media file</label>
            <input 
              disabled={loading}
              onChange={handleFile}
              className="form-control" 
              id="pass" 
              type="file"/>
          </div>
          <div className="col-sm-6">
            <label htmlFor="exp-date">Expiration date</label>
            <input 
              disabled={loading}
              type="date" 
              value={expirationDate} 
              onChange={(e) => setExpirationDate(e.target.value)}
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
              {loading ? 'Wait..' : 'Create Ad'}
            </button>
          </div>
        </div>      
      </form>

      {error && <Alert type="danger" content={error}/>}
      {success && <div className="alert alert-success break-word">Ad saved!</div>}

    </div>
  )
}

export default CreateAdPage
