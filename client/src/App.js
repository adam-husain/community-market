import React from 'react';
import {Link, Route, Routes } from 'react-router-dom';
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
import Product from './components/product';
import Profile from './components/profile';
import Help from './components/help';
import Account from './components/account';
import Market from './components/market';
import Invalid from './components/invalid';
import {Alert, Spinner} from "react-bootstrap";

// todo convert to class
class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			residences: [],
			products: [],
			user: {}
		}
		
		this.mainUrl = 'http://localhost:5000/api/v1/';
	}
	
	async componentDidMount() {
		
		try {
		
		}
		catch (e) {
			this.error();
		}
		
		await this.getProducts();
		await this.getResidences();
		await this.cookieLogin();
		document.getElementsByClassName('loaderPage')[0]
			.classList.add('fade');
		
	}
	
	error() {
		document.getElementsByClassName('errorPage')[0].classList.add('show');
	}
	
	async cookieLogin() {
		const cookies = new Cookies();
		const session = cookies.get('session');
		
		if (session == undefined) return;
		
		const response = await axios.post(this.mainUrl + 'account/cookieLogin', {session});
		if (response.status == 0) return;
		
		this.setState({
			user: response.result
		});
	}
	
	async getProducts() {
		const response = await axios.get(this.mainUrl + 'product/all');
		const status = response.data.status;
		const result = response.data.result;
		
		if (status == 0 || response.status == 400) {
			this.error();
			return;
		}
		
		this.setState({
			products: result
		});
	}
	
	async getResidences() {
		const response = await axios.get(this.mainUrl + 'residence/');
		const status = response.data.status;
		const result = response.data.result;
		
		if (status == 0 || response.status == 400) {
			this.error();
			return;
		}
		
		let resCopy = [];
		const cookies = new Cookies();
		for (const r of result) {
			const resData = cookies.get(r.shortName)
			r.selected = !(resData == undefined || resData == '0');
			resCopy.push(r);
		}
		
		this.setState({
			residences: resCopy
		});
	}
	
	render() {
		const residences = this.state.residences;
		const products = this.state.products;
		const user = this.state.user;
		
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
						Error! Cannot connect to database<br/>
						Try again later
					</Alert>
				</div>
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
						<Navbar.Toggle aria-controls="basic-navbar-nav"/>
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="me-auto">
								<Nav.Link as={Link} to={'/'}>Home</Nav.Link>
								<Nav.Link as={Link} to={'/market'}>Market</Nav.Link>
								<Nav.Link as={Link} to={'/forum'}>Forum</Nav.Link>
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
					<Route path='/market' element={<Market residences={residences} products={products} user={user}/>}/>
					<Route path='/profile' element={<Profile residences={residences} products={products} user={user}/>}/>
					<Route path='/account' element={<Account user={user}/>}/>
					<Route path='/product' element={<Product residences={residences} products={products}/>}/>
					<Route path='/help' element={<Help/>}/>
					<Route path='/about' element={<About residences={residences}/>}/>
					<Route path='*' element={<Invalid/>}/>
				</Routes>
			</div>
		);
	}
	
}

export default App;
