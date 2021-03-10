import React, { useState } from 'react'

import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom'
import { Redirect } from "react-router"

import Todos from './Todos/Todos'
import FinishedTodos from './Todos/FinishedTodos'

import burgerMenu from '../img/13590446331543238903.svg'

const signOut = () => {
	localStorage.removeItem('Todotoken');
}

const Dashboard = () => {
  const [sideMenu, setSideMenu] = useState(false);

	return (
        <>
            {!localStorage.getItem("Todotoken") && <Redirect to="/authc" />}
            <Router>
                <div className="d-flex">
                    <div className={`side-bar bg-light ${sideMenu && 'side-bar__display'}`}>
                        <div className="side-bar__heading">Dashboard</div>
                        <div className="side-bar__links">
                            <NavLink to="/dashboard/todos/currentTodos" className="side-bar__link">Todos</NavLink>
                            <a href="#logout" onClick={() => signOut()} className="side-bar__link">Logout</a>
                        </div>
                    </div>
                    <div className="content container-fluid">
                      <img src={burgerMenu} className="content__burger" onClick={() => {setSideMenu(!sideMenu);}}  alt=""/>
                        <h2>Todos</h2>
                        <div className="card">
                            <div className="card-header">
                                <ul className="nav nav-tabs card-header-tabs">
                                    <li className="nav-item">
                                        <NavLink
                                            className="nav-link"
                                            activeClassName="active"
                                            to="/dashboard/todos/currentTodos"
                                        >
                                            Current todos
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            className="nav-link"
                                            activeClassName="active"
                                            to="/dashboard/todos/finishedTodos"
                                        >
                                            Finished todos
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div className="card-body">
                                <Switch>
                                    <Route path="/dashboard/todos/currentTodos" component={Todos} exact />
                                    <Route path="/dashboard/todos/finishedTodos" component={FinishedTodos} />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        </>
    );
}

export default Dashboard
