import React, {useState, useEffect, useRef} from 'react'
import { UrlService } from '../services/UrlService'
import './SinglePaste.css';
import Loader from '../components/Loader';

const SinglePaste = ({ match }) => {
  const [urlData, seturlData] = useState(null);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);
  const service = new UrlService();
  const getData = async () => {
    setloading(true);
    const res = await service.getPaste(match.params.id);
    console.log(res);
    if(res.ok){
      seturlData(res.data);
      if(pasteContentRef.current){
        pasteContentRef.current.innerHTML = res.data?.content;
      }
    }else{
      seterror(res.data);
    }
    setloading(false);
  };

  const pasteContentRef = useRef(null);

  useEffect(() => {
    getData();
  }, [match]);
  
  if(!match.params.id){
    return (
      <div className="container">
        <h2>No url found</h2>
      </div>
    )
  }

  return ( 
    <>
      {loading && <div className="text-center"><Loader /></div>}
      <div className="container text-center">
        
        <div ref={pasteContentRef} id="paste-content" className="keep-spaces text-left paste-box mt-2">
          
        </div>

        <p>Visits: <span className="badge bg-secondary">{urlData?.viewsCount}</span></p>

        {error && <p className="text-danger">{ error }</p>}
      </div>
    </> 
  )
}

export default SinglePaste
