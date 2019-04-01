import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class Header extends Component {
  render() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Navbar</a>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <Link to="/" className="nav-link">home</Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/login" className="nav-link">login</Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/register" className="nav-link">register</Link>
                    </li>
                </ul>
            </div>
        </nav>
      
    )
  }
}

export default withRouter(Header);