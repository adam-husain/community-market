import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import {NavLink} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import logo from './images/logo.png'

import About from './components/about';
import Chat from './components/chat';
import Contact from './components/contact';
import Dashboard from './components/dashboard';
import Forum from './components/forum';
import Help from './components/help';
import Login from './components/login';
import Register from './components/register';
import Market from './components/market';


function App() {
    return (
        <div className="app">
            <div className="navbar navbar-expand navbar-dark bg-dark">
                <div className="container-fluid mx-5">
                    <a className="navbar-brand" href="#">
                        <img src={logo} alt="Residence Market logo" height="30"/>
                    </a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <NavLink
                                className="nav-item me-2"
                                activeClassName="active"
                                to="/">
                                Home
                            </NavLink>
                            <NavLink
                                className="nav-item me-2"
                                activeClassName="active"
                                to="/market">
                                Market
                            </NavLink>
                            <NavLink
                                className="nav-item me-2"
                                activeClassName="active"
                                to="/forum">
                                Forum
                            </NavLink>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container">
            
            </div>
        </div>
    );
}

export default App;
