import React from 'react'
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Short-it</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/_/create-url">Short url</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/_/create-paste">Create paste</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header
