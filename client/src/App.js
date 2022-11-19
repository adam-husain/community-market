import React, {useEffect, useState} from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import Cookies from "universal-cookie";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from "axios";

import './App.css';
import logo from './images/logo.png'

import Home from './components/home';
import About from './components/about';
import Chats from './components/chats';
import Product from './components/product';
import Profile from './components/profile';
import Help from './components/help';
import Account from './components/account';
import EditAccount from './components/editAccount';
import Market from './components/market';
import Invalid from './components/invalid';
import {Alert, Spinner} from "react-bootstrap";

function App() {
	
	const apiV1 = 'http://localhost:5000/api/v1/';
	const profileImage = 'http://localhost:5000/public/profile/';
	const productImage = 'http://localhost:5000/public/product/';
	
	const cookies = new Cookies();
	const [residences, setResidences] = useState([]);
	const [products, setProducts] = useState([]);
	const [user, setUser] = useState({});
	const [errorMessage, setErrorMessage] = useState('');
	
	useEffect(getAllData, []);
	
	/**
	 * This async function will wait till
	 * all the data is retrieved from the database.
	 * @returns {Promise<void>}
	 */
	async function getAllData() {
		try {
			await getProducts();
		} catch (e) {
			error();
		}
		
		await getResidences();
		await cookieLogin();
		document.getElementsByClassName('loaderPage')[0]
			.classList.add('fade');
	}
	
	function error(message = 'Error! Cannot connect to database\nTry again later') {
		setErrorMessage(message)
		document.getElementsByClassName('errorPage')[0].classList.add('show');
	}
	
	async function cookieLogin() {
		const session = cookies.get('session');
		
		if (session == undefined || session == '') return;
		
		const response = await axios.post(apiV1 + 'account/cookieLogin', {session});
		if (!response.data.status) return;
		
		setUser(response.data.result);
	}
	
	async function getProducts() {
		const response = await axios.get(apiV1 + 'product/all');
		const status = response.data.status;
		const result = response.data.result;
		
		if (!status || response.status == 400) {
			error();
			return;
		}
		
		setProducts(result);
	}
	
	async function getResidences() {
		const response = await axios.get(apiV1 + 'residence/');
		const status = response.data.status;
		const result = response.data.result;
		
		if (!status || response.status == 400) {
			error();
			return;
		}
		
		let resCopy = [];
		for (const r of result) {
			const resData = cookies.get(r.shortName)
			r.selected = !(resData == undefined || resData == '0');
			resCopy.push(r);
		}
		
		setResidences(resCopy);
	}
	
	
	function login(user) {
		const session = user.sessions[user.sessions.length - 1]._id;
		// Set cookie for 600 days
		cookies.set('session', session, {path: '/', maxAge: 51840000});
		setUser(user);
	}
	
	function logout() {
		setUser({})
		cookies.set('session', '')
	}
	
	return (
		<div className="app">
			<div className='loaderPage'>
				<h3 className='me-2'>
					Loading
				</h3>
				<Spinner className='mx-2' animation="grow" size='sm'/>
				<Spinner className='mx-2' animation="grow" size='sm'/>
				<Spinner className='mx-2' animation="grow" size='sm'/>
			</div>
			<div className='errorPage'>
				<Alert variant="danger">
					{errorMessage}
				</Alert>
			</div>
			<Navbar bg="dark" variant="dark" expand="sm">
				<Container>
					<Navbar.Brand as={Link} to={'/'}>
						<img
							src={logo}
							width="30"
							height="30"
							className="d-inline-block align-top"
							alt="Logo"
						/>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav"/>
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav variant='pills' className="me-auto">
							<Nav.Link as={Link} to={'/market'}>Market</Nav.Link>
							<Nav.Link as={Link} to={'/forum'}>Forum</Nav.Link>
							<Nav.Link as={Link} to={'/profile'}>Dashboard</Nav.Link>
							<Nav.Link as={Link} to={'/chats'}>Chats</Nav.Link>
							<NavDropdown title="Support" id="basic-nav-dropdown">
								<NavDropdown.Item as={Link} to={'/contact'}>Contact</NavDropdown.Item>
								<NavDropdown.Item as={Link} to={'/help'}>Help</NavDropdown.Item>
								<NavDropdown.Divider/>
								<NavDropdown.Item as={Link} to={'/about'}>About</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<div className='my-4'/>
			<Routes>
				<Route path='/' element={<Home residences={residences}/>}/>
				<Route path='/market' element={<Market residences={residences}
				                                       products={products}
				                                       productImage={productImage}
				                                       apiV1={apiV1}
				                                       user={user}/>}/>
				<Route path='/profile' element={<Profile residences={residences}
				                                         products={products}
				                                         user={user}
				                                         profileImage={profileImage}
				                                         productImage={productImage}
				                                         logoutFn={logout}/>}/>
				<Route path='/account' element={<Account user={user}
				                                         apiV1={apiV1}
				                                         profileImage={profileImage}
				                                         loginFn={login}/>}/>
				<Route path='/editAccount' element={<EditAccount user={user}
				                                                 apiV1={apiV1}
				                                                 refresh={getAllData}
				                                                 profileImage={profileImage} />}/>
				<Route path='/product' element={<Product residences={residences}
				                                         user={user}
				                                         apiV1={apiV1}
				                                         refresh={getAllData}
				                                         productImage={productImage}/>}/>
				<Route path='/chats' element={<Chats user={user}
				                                     profileImage={profileImage}
				                                     apiV1={apiV1}/>}/>
				<Route path='/help' element={<Help/>}/>
				<Route path='/about' element={<About residences={residences}/>}/>
				<Route path='*' element={<Invalid/>}/>
			</Routes>
		</div>
	);
	
}

export default App;
