import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
    return (
      <div className="container text-center">
        <img src="/not_found.png" height="300px" alt="Not found ilustration"/>
        <p>
          <Link to="/" className="btn btn-primary">Go to home</Link>
        </p>
      </div>
    )
}

export default NotFoundPage
