import React, {useState, useEffect, useRef} from 'react'
import { Redirect } from 'react-router-dom';
import { UrlService } from '../services/UrlService'
import './SinglePaste.css';
import Loader from '../components/Loader';
import Alert from '../components/Alert';

const SinglePaste = ({ match }) => {
  const [paste, setPaste] = useState(null);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);
  const [likesCount, setLikesCount] = useState('')
  const service = new UrlService();
  const getData = async () => {
    setloading(true);
    const res = await service.getPaste(match.params.id);
    console.log(res);
    if(res.ok){
      setPaste(res.url);
      setLikesCount(res.url.likesCount);
      pasteContentRef.current.innerHTML = res.url.content;
    }else{
      seterror(res.message);
    }
    setloading(false);
  };

  const pasteContentRef = useRef(null);

  useEffect(() => {
    getData();
  }, [match]);

  const handleLike = async () => {
    if(paste && paste._id){      
      const res = await service.likePaste(paste._id);
      console.log('like res ', res);
    }
  };
  
  if(error || !match.params.id){
    return <Redirect to="/not-found"/>
  }

  return ( 
    <>
      {loading && <div className="text-center"><Loader /></div>}
      <div className="container text-center">
        
        <div className="card mt-2 text-left">
          <div className="card-header">
            <h4 className="card-title">{paste?.title}</h4>
          </div>
          <div className="card-body keep-spaces" ref={pasteContentRef}>

          </div>
        </div>

        <div className="row mt-2">
          <div className="col-sm-6 text-left">
            <button onClick={handleLike} className="btn btn-light">Likes <span className="badge bg-danger">{likesCount}</span></button>
          </div>
          <div className="col-sm-6 text-right">
            <button className="btn btn-warning">Report</button>
          </div>
        </div>

        <p>Visits: <span className="badge bg-secondary">{paste?.viewsCount}</span></p>

        {error && <Alert content={error} type="danger" />}
      </div>
    </> 
  )
}

export default SinglePaste
