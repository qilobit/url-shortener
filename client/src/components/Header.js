import React from 'react'
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light soft-shadow2">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Short-it</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/_/create-url">Short url</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/_/create-paste">Create paste</Link>
                        </li>
                    </ul>
                    <div className="login-area">
                        <Link className="nav-link" to="/login">Login</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header
