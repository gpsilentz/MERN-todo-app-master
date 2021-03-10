import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import LogoNav from '../../img/13946774961612335097.svg'

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const isUserSignedIn = localStorage.getItem('Todotoken');

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
      window.addEventListener('scroll', handleScroll);

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);

  return (
    <div>
      <nav className={`navbar navbar-expand-lg navbar-light fixed-top ${showMenu && 'navbar-white'} ${scrollPosition > 80 && 'navbar-scrolled'}`}>
          <div className="container">
            <img src={LogoNav} className="d-inline-block align-top" alt="" />
            <button className="navbar-toggler" onClick={() => setShowMenu(!showMenu)}>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse justify-content-end ${showMenu && 'show'}`} id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/Authc">Product</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Authc">Prices</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Authc">About</Link>
                </li>
                {!isUserSignedIn ? 
                <>
                <li className="nav-item left">
                  <Link className="nav-link btn btn-primary text-white shadow-sm" to="/authc">Login</Link>
                </li>
                </>
                : 
                <>
                <li className="nav-item left">
                  <Link className="nav-link btn btn-primary text-white shadow-sm" to="/dashboard">Todos</Link>
                </li>
                </>
                }
              </ul>
            </div>
          </div>
        </nav>
    </div>
  )
}

export default Navbar
