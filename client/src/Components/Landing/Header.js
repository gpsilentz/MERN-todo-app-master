import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import Logo from '../../img/undraw_accept_tasks_po1c.svg'

import AOS from 'aos'
import 'aos/dist/aos.css'

const Header = () => {
  useEffect(() => {
    AOS.init({ duration : 600, once: true });
  }, []);

  return (
    <div>
      <header className="header">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-6 col-md-12">
              <h1 data-aos="fade-up" data-aos-delay="400">To-do list for web.</h1>
              <p data-aos="fade-up" data-aos-delay="600">Lorem ipsum dolor sit amet, consectetur adipisicing elit. In corrupti neque ab reiciendiserror quas.</p>
              <Link data-aos="fade-up" data-aos-delay="800" className="btn btn-lg btn-primary shadow" to="/dashboard/todos/currentTodos">Get started</Link>
            </div>
            <div className="header__image col-lg-6">
              <img src={Logo} className="img-fluid" alt="React Logo" data-aos="fade-up" data-aos-delay="400" />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header
