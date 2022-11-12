import React from 'react';
import {Button, Container, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

function Profile() {
	
	const user = {
		name: 'Adam Husain',
		profilePic: 'https://myresidence.shop/img/profile/default.jpeg',
		pronouns: 'He/Him',
		whatsapp: '96872282361',
		email: 'adamhusain12@gmail.com'
	}
	
	const navigate = useNavigate();
	const logout = () => {
		navigate('/market');
	}
	
	const mainButtonStyle = {
		width: '100px',
		height: '100px',
		borderRadius: '20px',
		margin: '20px auto',
	}
	
	const mainButtonText = {
		fontSize: '12px',
		marginTop: '5px'
	}
	
	const accordionStyle = {
		background: 'var(--secondary-color)',
		marginTop: '20px',
		padding: '20px',
		borderRadius: '10px',
		overflow: 'hidden',
		// todo: Change maxHeight to 60px
		maxHeight: '1000px',
		transition: 'max-height 0.5s ease-out'
	}
	
	const arrowStyle = {
		marginRight: '10px',
		transform: 'rotate(0deg)',
		transition: 'transform 0.5s ease'
	}
	
	const accordionBodyStyle = {
		marginTop: '10px',
		padding: '20px',
		borderRadius: '10px',
	}
	
	const pictureStyle = {
		margin: '0 auto 20px',
		maxWidth: '80px',
		borderRadius: '50%',
		display: 'block'
	}
	
	const profileContentStyle = {
		fontSize: '14px',
		borderBottom: '1px',
		borderStyle: 'none none solid none',
		color: 'var(--heading-color)',
		maxWidth: '350px',
		marginBottom: '20px',
		padding: '0 10px',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-end'
	}
	
	const toggleAccordion = (e) => {
		const target = e.target;
		if (!target.classList.contains('accordion')) return;
		if (target.style.maxHeight == '1000px') {
			target.style.maxHeight = '60px';
			target.firstChild.style.transform = 'rotate(0deg)'
		} else {
			target.style.maxHeight = '1000px';
			target.firstChild.style.transform = 'rotate(180deg)'
		}
	}
	
	const editProfile = () => {
		navigate('/account');
	}
	
	const editProduct = () => {
		navigate('/product');
	}
	
	return (
		<Container>
			<div className='custom-header shadow'>
				<Button style={{float: 'right'}} variant={"secondary"} onClick={logout}>
					Logout
				</Button>
				<h2>Dashboard</h2><br/>
				<small>Manage your profile, product listings and forum posts</small>
			</div>
			
			<div style={{display: 'flex', maxWidth: '380px'}}>
				<Button disabled={true} variant={"outline-light"} style={mainButtonStyle} onClick={editProfile}>
					<FontAwesomeIcon icon={solid("user")} size={"2xl"}/>
					<div style={mainButtonText}>Edit<br/>Profile</div>
				</Button>
				<Button variant={"outline-light"} style={mainButtonStyle} onClick={editProduct}>
					<FontAwesomeIcon icon={solid("shopping-bag")} size={"2xl"}/>
					<div style={mainButtonText}>New<br/>Product</div>
				</Button>
				<Button disabled={true} variant={"outline-light"} style={mainButtonStyle} onClick={editProfile}>
					<FontAwesomeIcon icon={solid("calendar-plus")} size={"2xl"}/>
					<div style={mainButtonText}>New<br/>Post</div>
				</Button>
			</div>
			
			<div className={'accordion'} style={{...accordionStyle, maxWidth: '380px'}} onClick={toggleAccordion}>
				<FontAwesomeIcon style={arrowStyle} icon={solid("angle-down")}/>
				Profile
				<div style={accordionBodyStyle} className={'shadow'}>
					
					<img src={user.profilePic} style={pictureStyle} alt='Profile Picture'/>
					
					<div style={profileContentStyle}>
						<b>Name</b>
						<div>
							{user.name}
						</div>
					</div>
					
					<div style={profileContentStyle}>
						<b>Pronouns</b>
						<div>
							{user.pronouns}
						</div>
					</div>
					
					<div style={profileContentStyle}>
						<b>Contact</b>
						<div>
							+{user.whatsapp}
						</div>
					</div>
					
					<div style={profileContentStyle}>
						<b></b>
						<div>
							{user.email}
						</div>
					</div>
				</div>
			</div>
			
		</Container>
	)
}

export default Profile;