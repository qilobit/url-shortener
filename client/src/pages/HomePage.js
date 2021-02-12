import React from 'react'
import './HomePage.css';

const HomePage = () => {

    return (
        <div className="container mt-3">
            <div className="card deep-shadow2">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6 top-left">
                            <h2 className="card-title">Short and share your links for free.</h2>
                        </div>
                        <div className="col-sm-6 text-center">
                            <img src="/share_link.png" className="share-img" alt="Share your links"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
