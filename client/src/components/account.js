import React from 'react';

import './styles/account.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import {Button, Container, Form} from "react-bootstrap";

function Account() {
	
	const pronouns = [
		{
			id: 0,
			label: 'Rather not say'
		},
		{
			id: 1,
			label: 'He/Him'
		},
		{
			id: 2,
			label: 'She/Her'
		},
		{
			id: 3,
			label: 'They/Them'
		},
		
	]
	
	const DefaultImage = 'https://myresidence.shop/img/profile/default.jpeg';
	
	const toggleForms = () => {
		const headers = document.getElementsByClassName('custom-header');
		Array.from(headers).map((h) => {
			h.classList.toggle('show-header')
		})
	}
	
	return (
		<Container>
			<div style={{display: 'flex', justifyContent: 'center', overflow: "hidden"}}>
				<div className='custom-header shadow hide-header-0 p-4'>
					<h2>Login</h2><br/>
					<small>Don't have an account?</small>
					<Button variant={'outline-light'} className='ms-3' onClick={toggleForms}>
						Register
						<FontAwesomeIcon className='right-arrow' icon={solid("angle-right")} size={"xl"}/>
					</Button>
					
					<Form className='my-5'>
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
				</div>
				
				<div className='custom-header shadow hide-header-1 show-header p-4'>
					<h2>Register</h2><br/>
					<small>Already have an account?</small>
					<Button className='ms-3' variant={"outline-light"} onClick={toggleForms}>
						<FontAwesomeIcon className='left-arrow' icon={solid("angle-left")} size={"xl"}/>
						Login
					</Button>
					
					<Form className='my-5'>
						<Form.Group className="mb-3">
							<Form.Label>Upload your profile picture</Form.Label>
							<Form.Control type="file" />
							<img className='picture-preview' src={DefaultImage} alt='Profile picture preview'/>
						</Form.Group>
						
						<Form.Group className="mb-3">
							<Form.Label>Username</Form.Label>
							<Form.Control name='username' type="text" placeholder="5-10 characters" required/>
							<Form.Text className="text-muted">
								Choose a unique username
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
							<Form.Label>Username</Form.Label>
							<Form.Control name='name' type="text" placeholder="2-20 characters" required/>
							<Form.Text className="text-muted">
								Your name will be displayed publicly
							</Form.Text>
						</Form.Group>
						
						<Form.Group className="mb-3">
							<Form.Label name='pronouns'>Pronouns</Form.Label>
							<Form.Select name='pronouns' defaultValue={0}>
								{
									pronouns.map((p) => {
										return (
											<option value={p.id}>{p.label}</option>
										)
									})
								}
							</Form.Select>
							<Form.Text className="text-muted">
								Helps to ease user interaction
							</Form.Text>
						</Form.Group>
						
						<Form.Group className="mb-3">
							<Form.Label>Whatsapp</Form.Label>
							<Form.Control name='whatsapp' type="email" placeholder="+60123456789" />
							<Form.Text className="text-muted">
								(Optional)
							</Form.Text>
						</Form.Group>
						
						<div className="mb-3 text-muted">
							Your email and whatsapp number will not be shared with anyone.
							It will be used to send you notifications in case someone is
							interested in your products or replied to your forum post.
						</div>
						
						<Button variant="secondary" type="submit">
							Submit
						</Button>
					</Form>
				</div>
				
				
			</div>
			
			
		</Container>
	)
}

export default Account;