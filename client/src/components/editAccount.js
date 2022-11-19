import React, {useEffect, useState} from 'react';

import './styles/account.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro'
import {Alert, Button, Container, Form} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function EditAccount({user, profileImage, apiV1, refresh}) {
	
	const navigate = useNavigate();
	useEffect(() => {
		if (user._id) {
			setPreviewUrl(profileImage + user.profilePicture);
		}
		else {
			navigate('/');
		}
	}, []);
	
	const DefaultImage = profileImage + 'default.jpg';
	const [previewUrl, setPreviewUrl] = useState(DefaultImage);
	const [isLoading, setIsLoading] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');
	const pronounsList = ['Rather not say', 'He/Him', 'She/Her', 'They/THem'];
	
	const previewProfileImage = (e) => {
		if (!e.target.files || e.target.files.length === 0) {
			return
		}
		
		const file = e.target.files[0];
		const objectUrl = URL.createObjectURL(file);
		setPreviewUrl(objectUrl);
	}
	
	async function editSubmit(e) {
		e.preventDefault();
		setAlertMessage('');
		if (isLoading) return;
		
		const target = e.target;
		const profilePicture = target[0].files[0];
		const name = target[2].value;
		const pronouns = pronounsList[target[3].value];
		const preferWhatsapp = target[4].checked;
		const whatsapp = target[5].value;
		
		// Verify whatsapp number
		if (preferWhatsapp && whatsapp.trim().length === 0
			|| whatsapp.trim().length != 0 && !verifyNumber(whatsapp))
		{
			setAlertMessage('Please enter a valid whatsapp number');
			return;
		}
		
		const data = new FormData();
		data.append('id', user._id);
		data.append('profilePicture', profilePicture);
		data.append('name', name);
		data.append('pronouns', pronouns);
		data.append('whatsapp', whatsapp);
		data.append('preferWhatsapp', preferWhatsapp);
		
		setIsLoading(true);
		const result = await axios.post(apiV1 + 'account/edit', data,
			{headers: {'Content-Type': 'multipart/form-data'}});
		console.log(result);
		setIsLoading(false);
		
		if (result.data.status) {
			refresh().then(() => {
				navigate('/profile');
			})
		}
		else {
			setAlertMessage('Error updating account! Try again later');
		}
	}
	
	function verifyNumber(number) {
		return number[0] === '+' && number.length > 8;
	}
	
	return (
		<Container>
			<div className={'custom-header shadow p-4 show-header'}>
				<h2>Edit Profile</h2><br/>
				<Button className='ms-3' variant={"outline-light"} onClick={() => navigate('/profile')}>
					<FontAwesomeIcon className='left-arrow' icon={solid("angle-left")} size={"xl"}/>
					Back
				</Button>
				
				<Form method='post' onSubmit={editSubmit} className='my-5'>
					<Form.Group className="mb-3">
						<Form.Label>Upload your profile picture</Form.Label>
						<Form.Control onChange={previewProfileImage} name='profilePicture'
						              type="file" accept="image/*"/>
						<img className='picture-preview mt-5' src={previewUrl} alt='Profile picture preview'/>
					</Form.Group>
					
					<Form.Group className="mb-3">
						<Form.Label>Email</Form.Label>
						<Form.Control disabled={true} name='email' type="email" defaultValue={user.email}/>
						<Form.Text className="text-muted">
							You cannot edit email
						</Form.Text>
					</Form.Group>
					
					<Form.Group className="mb-3">
						<Form.Label>Name</Form.Label>
						<Form.Control name='name' type="text" placeholder="2-20 characters" defaultValue={user.name} required/>
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
							<input type="checkbox" id='whatsapp-checkbox' defaultChecked={user.preferWhatsapp}/>
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
						<Form.Control name='name' type="text" placeholder="+60123456789" defaultValue={user.whatsapp}/>
						<Form.Text className="text-muted">
							Your whatsapp number should start with a '+'
						</Form.Text>
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
		</Container>
	)
}

export default EditAccount;