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
import Profile from './components/profile';
import Forum from './components/forum';
import Help from './components/help';
import Account from './components/account';
import Market from './components/market';
import Invalid from './components/invalid';

const residencesRaw = require('./residences.json');

function App() {
	const cookies = new Cookies();
	
	const residences = {}
	for (const r of residencesRaw) {
		const id = r.shortName;
		residences[id] = r;
		const resData = cookies.get(id)
		residences[id].selected = !(resData == undefined || resData == '0');
	}
	
	return (
		<div className="app">
			<Navbar bg="dark" variant="dark" expand="sm">
				<Container>
					<Navbar.Brand href={'/'}>
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
				<Route path='/market' element={<Market residences={residences} />}/>
				<Route path='/profile' element={<Profile />}/>
				<Route path='/account' element={<Account />}/>
				<Route path='/help' element={<Help />}/>
				<Route path='/about' element={<About residences={residences} />}/>
				<Route path='*' element={<Invalid/>}/>
			</Routes>
		</div>
	);
}

export default App;
