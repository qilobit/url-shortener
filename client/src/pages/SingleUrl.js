import React, {useState, useEffect} from 'react'
import { UrlService } from '../services/UrlService'
import './SingleUrl.css';

const SingleUrl = ({ match }) => {
  const [urlData, seturlData] = useState(null);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);
  const [countDown, setcountDown] = useState(5);
  const [finish, setfinish] = useState(false)
  const service = new UrlService();
  const getData = async () => {
    setloading(true);
    const res = await service.getUrl(match.params.url);
    console.log(res);
    if(res.ok){
      seturlData(res.data);
      startCountDown();
    }else{
      seterror(res.data);
    }
    setloading(false);
  };
  const startCountDown = () => {
    let count = 4;
    const _interval = setInterval(() => {
      if(count <= 0){
        clearInterval(_interval);
        setfinish(true);
      }else{
        setcountDown(count);
        count--;
      }
    }, 1000);
  };
  
  useEffect(() => {
    getData();
  }, [match]);
  
  if(!match.params.url){
    //TODO
    return (
      <div className="container">
        <h2>No url found</h2>
      </div>
    )
  }

  return ( 
    <>
    <div className="card p-3 ad my-3">
      <a href="https://www.linkedin.com/pulse/after-publishing-50-articles-linkedin-ive-learned-tom-popomaronis" target="_black">
        <img src={process.env.PUBLIC_URL +'/ad.png'} alt="Advertising"/>
      </a>
    </div>   
    {
      loading 
      ? <div className="text-center">loading..</div>
      : <div className="container text-center">
          {
            finish === false
            ? <button disabled className="btn btn-primary">
                { `Wait ${countDown} seconds` }
              </button>
            : <a href={urlData?.longUrl} target="_blank" className="btn btn-primary">Open link</a>
          }

          <p>Visits: {urlData?.viewsCount}</p>

          {error && <p className="text-danger">{ error }</p>}
        </div>
    }
    </> 
  )
}

export default SingleUrl
