import React from 'react'
import { UrlService } from '../services/UrlService';

const HomePage = () => {
    const service = new UrlService();

    service.getAll().then(r => console.log(r))
    .catch(e => console.log('err ', e));

    return (
        <div className="container">
            <h2>Home</h2>
        </div>
    )
}

export default HomePage
