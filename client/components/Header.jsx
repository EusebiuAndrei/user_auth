import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class Header extends Component {
  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Navbar</a>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link to="/" className="nav-link">home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/register" className="nav-link">register</Link>
                    </li>
                </ul>
            </div>
        </nav>
      
    )
  }
}

export default withRouter(Header);