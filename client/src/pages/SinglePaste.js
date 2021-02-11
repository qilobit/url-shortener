import React, {useState, useEffect} from 'react'
import { UrlService } from '../services/UrlService'
import './SinglePaste.css';

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
    }else{
      seterror(res.data);
    }
    setloading(false);
  };

  
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
    {
      loading 
      ? <div className="text-center">loading..</div>
      : <div className="container text-center">
          
          <p className="keep-spaces text-left paste-box">
            { urlData?.content }
          </p>

          <p>Visits: {urlData?.viewsCount}</p>

          {error && <p className="text-danger">{ error }</p>}
        </div>
    }
    </> 
  )
}

export default SinglePaste
