import React from 'react'

const DEFAULT_URL = 'https://www.linkedin.com/pulse/after-publishing-50-articles-linkedin-ive-learned-tom-popomaronis';
const AdCard = ({link, img}) => {
  return (
    <div className="card p-3 ad my-3">
      <a href={link ? link : DEFAULT_URL} target="_black">
        <img src={img ? img : process.env.PUBLIC_URL +'/ad.png'} alt="Advertising"/>
      </a>
    </div>  
  )
}

export default AdCard
