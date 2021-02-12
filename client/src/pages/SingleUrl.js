import React, {useState, useEffect} from 'react'
import { UrlService } from '../services/UrlService'
import './SingleUrl.css';
import Loader from '../components/Loader';
import { Redirect } from 'react-router-dom';
import Alert from '../components/Alert';

const SingleUrl = ({ match }) => {
  const [urlData, seturlData] = useState(null);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);
  const [countDown, setcountDown] = useState(5);
  const [finish, setfinish] = useState(false);
  const [isOk, setisOk] = useState(false)
  const [isExpired, setisExpired] = useState(false)
  const service = new UrlService();
  const getData = async () => {
    setloading(true);
    const res = await service.getUrl(match.params.url);
    console.log(res);    
    if(res.ok){
      if(res.data.expired === true){
        setisExpired(true);
      }else{
        seturlData(res.data);
        setisOk(true);
        startCountDown();
      }
    }else{
      seterror(true);
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
  
  if(error){
    return <Redirect to="/not-found"/>
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
      ? <div className="text-center">
          <Loader />
        </div>
      : <div className="container text-center">
          {
            isOk &&
            <>
              {
                finish === false
                ? <button disabled className="btn btn-primary">
                    { `Wait ${countDown} seconds` }
                  </button>
                : <a href={urlData?.longUrl} target="_blank" className="btn btn-primary">Open link</a>
              }
            </>
          }

          {isOk && <p className="mt-2">Visits: <span className="badge bg-secondary">{urlData?.viewsCount}</span></p>}
          {error && <Alert type="danger" content={error} />}
          {isExpired && <Alert type="danger" content="Url expired" />}

        </div>
    }
    </> 
  )
}

export default SingleUrl
