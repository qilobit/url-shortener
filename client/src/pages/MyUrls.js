import React, {useState, useEffect} from 'react'
import { UrlService } from '../services/UrlService'
import Loader from '../components/Loader';
import Alert from '../components/Alert';

const MyUrlsPage = ({ match }) => {
  const [list, setList] = useState(null);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);

  const service = new UrlService();
  const getData = async () => {
    setloading(true);
    const res = await service.getAllUrl();
    if(res.ok){
      setList(res.urls);
      console.log(res.urls);    
    }else{
      seterror(true);
    }
    setloading(false);
  };
  
  useEffect(() => {
    getData();
  }, [match]);

  return ( 
    <>
    {
      loading 
      ? <div className="text-center">
          <Loader />
        </div>
      : <div className="container">
          <table className="table table-responsive table-condensed">
            <thead>
              <tr>
                <th>Code</th>
                <th>Target url</th>
                <th>Creation</th>
                <th>Visits</th>
              </tr>
            </thead>
            <tbody>
              { list !== null && list.map(x => {
                return <tr key={x._id}>
                  <td><a href={`${window.location.origin}/${x.urlCode}`} target="_blank">{x.urlCode}</a></td>
                  <td>{x.longUrl}</td>
                  <td>{x.date}</td>
                  <td>{x.viewsCount}</td>
                </tr>
              })}
            </tbody>
          </table>

          {error && <Alert type="danger" content={error} />}

        </div>
    }
    </> 
  )
}

export default MyUrlsPage
