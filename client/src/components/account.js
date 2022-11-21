import React, {useState} from 'react';

import './styles/account.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro'
import {Alert, Button, Container, Form} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Account({user, profileImage, loginFn, apiV1}) {
	
	const navigate = useNavigate();
	
	if (user.name != undefined) {
		navigate('/profile');
	}
	
	const DefaultImage = profileImage + 'default.jpg';
	const [previewUrl, setPreviewUrl] = useState(DefaultImage);
	const [isLoading, setIsLoading] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');
	const pronounsList = ['Rather not say', 'He/Him', 'She/Her', 'They/Them'];
	
	const toggleForms = () => {
		const headers = document.getElementsByClassName('custom-header');
		Array.from(headers).map((h) => {
			h.classList.toggle('show-header')
		})
	}
	
	const previewProfileImage = (e) => {
		if (!e.target.files || e.target.files.length === 0) {
			return
		}
		
		const file = e.target.files[0];
		const objectUrl = URL.createObjectURL(file);
		setPreviewUrl(objectUrl);
	}
	
	async function loginSubmit(e) {
		e.preventDefault();
		clearErrors();
		if (isLoading) return;
		
		const target = e.target;
		const username = target[0].value;
		const password = target[1].value;
		
		const data = {
			username, password
		};
		
		setIsLoading(true);
		const response = await axios.post(apiV1 + 'account/login', data);
		setIsLoading(false);
		
		if (response.data.status) {
			loginFn(response.data.result);
			navigate('/profile');
		}
		else {
			setAlertMessage('Invalid username or password!');
		}
	}
	
	async function registerSubmit(e) {
		e.preventDefault();
		clearErrors();
		if (isLoading) return;
		
		const target = e.target;
		const profilePicture = target[0].files[0];
		const username = target[1].value;
		const password = target[2].value;
		const name = target[3].value;
		const pronouns = pronounsList[target[4].value];
		const whatsapp = target[5].value;
		const preferWhatsapp = target[6].value;
		
		// check if username meets length requirements
		if (username.length > 20 || username.length < 5) {
			target[1].classList.add('is-invalid');
			setAlertMessage('Username needs to be between 5 to 20 characters');
			return;
		}
		
		// Check if username has invalid characters
		const usernameRegex = /^[a-zA-Z0-9]+$/;
		if (!username.match(usernameRegex)) {
			target[1].classList.add('is-invalid');
			setAlertMessage('Username must not contain invalid characters');
			return;
		}
		
		// Check if username is unique
		const resultUsername = await axios.post(apiV1 + 'account/checkUnique', {username});
		if (!resultUsername.data.status) {
			target[1].classList.add('is-invalid');
			setAlertMessage('Username is already in use');
			return;
		}
		
		// Check if password meets requirements
		if (password.length < 5)
		{
			target[2].classList.add('is-invalid');
			setAlertMessage('Password is too short');
			return;
		}
		
		const data = new FormData();
		data.append('profilePicture', profilePicture);
		data.append('username', username);
		data.append('password', password);
		data.append('name', name);
		data.append('pronouns', pronouns);
		data.append('whatsapp', whatsapp);
		data.append('preferWhatsapp', preferWhatsapp);
		
		setIsLoading(true);
		const result = await axios.post(apiV1 + 'account/register', data,
			{headers: {'Content-Type': 'multipart/form-data'}});
		setIsLoading(false);
		
		if (result.data.status) {
			navigate('/account#login');
		}
		else {
			setAlertMessage('Could not register! Try again later.')
		}
	}
	
	function clearErrors() {
		const formElems = document.getElementsByClassName('form-control');
		for (const e of formElems) {
			e.classList.remove('is-invalid');
		}
		
		setAlertMessage('');
	}
	
	const showLoginFirst = () => {
		return window.location.hash == '#login'
	}
	
	return (
		<Container>
			<div style={{display: 'flex', justifyContent: 'center', overflow: "hidden"}}>
				<div className={'custom-header shadow hide-header-0 p-4 ' + (showLoginFirst() ? 'show-header' : '')}>
					<h2>Login</h2><br/>
					<small>Don't have an account?</small>
					<Button variant={'outline-light'} className='ms-3' onClick={toggleForms}>
						Register
						<FontAwesomeIcon className='right-arrow' icon={solid("angle-right")} size={"xl"}/>
					</Button>
					
					<Form method='post' onSubmit={loginSubmit} className='my-5'>
						<Form.Group className="mb-3">
							<Form.Label>Username</Form.Label>
							<Form.Control name='username' type='text' placeholder='Username' required/>
						</Form.Group>
						
						<Form.Group className="mb-3">
							<Form.Label>Password</Form.Label>
							<Form.Control name='password' type="password" placeholder="Password" required/>
						</Form.Group>
						
						<Button variant="secondary" type="submit">
							Submit
						</Button>
					</Form>
					
					{
						alertMessage === '' ? '' : (
							<Alert variant='danger'>
								{alertMessage}
							</Alert>
						)
					}
				</div>
				
				
				
				<div className={'custom-header shadow hide-header-1 p-4 ' + (showLoginFirst() ? '' : 'show-header')}>
					<h2>Register</h2><br/>
					<small>Already have an account?</small>
					<Button className='ms-3' variant={"outline-light"} onClick={toggleForms}>
						<FontAwesomeIcon className='left-arrow' icon={solid("angle-left")} size={"xl"}/>
						Login
					</Button>
					
					<Form method='post' onSubmit={registerSubmit} className='my-5'>
						<Form.Group className="mb-3">
							<Form.Label>Upload your profile picture</Form.Label>
							<Form.Control onChange={previewProfileImage} name='profilePicture'
							              type="file" accept="image/*"/>
							<img className='picture-preview mt-5' src={previewUrl} alt='Profile picture preview'/>
						</Form.Group>
						
						<Form.Group className="mb-3">
							<Form.Label>Username</Form.Label>
							<Form.Control name='username' type="text" placeholder="5-20 characters" required/>
							<Form.Text className="text-muted">
								Your username must be unique
							</Form.Text>
						</Form.Group>
						
						<Form.Group className="mb-3">
							<Form.Label>Password</Form.Label>
							<Form.Control name='password' type="password" placeholder="5-50 characters" required/>
							<Form.Text className="text-muted">
								Your password will be encrypted
							</Form.Text>
						</Form.Group>
						
						<Form.Group className="mb-3">
							<Form.Label>Name</Form.Label>
							<Form.Control name='name' type="text" placeholder="2-20 characters" required/>
							<Form.Text className="text-muted">
								Your name will be displayed publicly
							</Form.Text>
						</Form.Group>
						
						<Form.Group className="mb-3">
							<Form.Label name='pronouns'>Pronouns</Form.Label>
							<Form.Select name='pronouns' defaultValue={0}>
								{
									pronounsList.map((p, i) => {
										return (
											<option value={i}>{p}</option>
										)
									})
								}
							</Form.Select>
							<Form.Text className="text-muted">
								Helps to ease user interaction
							</Form.Text>
						</Form.Group>
						
						<Form.Group className='mb-3'>
							<Form.Label>Prefer Whatsapp for contact</Form.Label>
							<div className="checkbox-wrapper"
							     style={{display: "flex", alignItems: "end"}}>
								<input type="checkbox" id='whatsapp-checkbox'/>
								<label htmlFor='whatsapp-checkbox'>
									<div className="tick_mark"></div>
								</label>
							</div>
							<Form.Text className="text-muted">
								If enabled, you will be contacted via Whatsapp rather than the in-app chat
							</Form.Text>
						</Form.Group>
						
						<Form.Group className="mb-3">
							<Form.Label>Whatsapp</Form.Label>
							<Form.Control name='name' type="text" placeholder="+60123456789"/>
							<Form.Text className="text-muted">
								Your whatsapp number should start with a '+'
							</Form.Text>
						</Form.Group>
						
						<div className="mb-3 text-muted">
						
						</div>
						
						<Button variant="secondary" type="submit">
							Submit
						</Button>
					</Form>
					
					{
						alertMessage === '' ? '' : (
							<Alert variant='danger'>
								{alertMessage}
							</Alert>
						)
					}
				</div>
			</div>
		
		</Container>
	)
}

export default Account;