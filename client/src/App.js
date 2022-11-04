import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Cookies from "universal-cookie";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import './App.css';
import logo from './images/logo.png'

import Home from './components/home';
import About from './components/about';
import Chat from './components/chat';
import Contact from './components/contact';
import Dashboard from './components/dashboard';
import Forum from './components/forum';
import Help from './components/help';
import Login from './components/login';
import Register from './components/register';
import Market from './components/market';
import Invalid from './components/invalid';

const residences = require('./residences.json');

function App() {
	const cookies = new Cookies();
	
	for (const r in residences) {
		const resData = cookies.get(residences[r].shortName)
		console.log(resData);
		residences[r].selected = !(resData == undefined || resData == '0');
	}
	
	return (
		<div className="app">
			<Navbar bg="dark" variant="dark" expand="lg">
				<Container>
					<Navbar.Brand>
						<img
							src={logo}
							width="30"
							height="30"
							className="d-inline-block align-top"
							alt="Logo"
						/>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link as={Link} to={'/'}>Home</Nav.Link>
							<Nav.Link as={Link} to={'/market'}>Market</Nav.Link>
							<Nav.Link as={Link} to={'/forum'}>Forum</Nav.Link>
							<NavDropdown title="Support" id="basic-nav-dropdown">
								<NavDropdown.Item as={Link} to={'/contact'}>Contact</NavDropdown.Item>
								<NavDropdown.Item as={Link} to={'/help'}>Help</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item as={Link} to={'/about'}>About</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<div className='my-4'/>
			<Routes>
				<Route path='/' element={<Home residences={residences} />}/>
				<Route path='/market' element={<Market />}/>
				<Route path='*' element={<Invalid/>}/>
			</Routes>
		</div>
	);
}

export default App;
