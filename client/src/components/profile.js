import React, {useEffect, useState} from 'react';
import {Button, Container, Form, Modal} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro'
import Card from "./card";

function Profile({residences, products, user, profileImage, productImage, logoutFn}) {
	
	const navigate = useNavigate();
	
	useEffect(() => {
		if (user.name === undefined) {
			navigate('/account#login');
			return;
		}
		
		
	}, [])
	
	const [showRemoveProductModal, setShowRemoveProductModal] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState({});
	const [selectedPost, setSelectedPost] = useState({});
	
	
	const logout = () => {
		logoutFn();
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
		maxHeight: '10000px',
		transition: 'max-height 0.5s ease-out'
	}
	
	const arrowStyle = {
		marginRight: '10px',
		// todo: Change to rotate(0deg)
		transform: 'rotate(180deg)',
		transition: 'transform 0.5s ease'
	}
	
	const accordionBodyStyle = {
		marginTop: '10px',
		padding: '20px',
		borderRadius: '10px',
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
	
	const modalBgStyle = {
		backdropFilter: 'blur(8px)'
	}
	
	
	const toggleAccordion = (e) => {
		const target = e.target;
		if (!target.classList.contains('accordion')) return;
		if (target.style.maxHeight == '10000px') {
			target.style.maxHeight = '60px';
			target.firstChild.style.transform = 'rotate(0deg)'
		} else {
			target.style.maxHeight = '10000px';
			target.firstChild.style.transform = 'rotate(180deg)'
		}
	}
	
	const editProfile = () => {
		navigate('/editAccount');
	}
	
	const newProduct = () => {
		navigate('/product');
	}
	
	const newPost = () => {
		navigate('/post');
	}
	
	const closeModal = () => {
		setShowRemoveProductModal(false);
	}
	
	const removeProductModal = (p) => {
		setSelectedProduct(p);
		setShowRemoveProductModal(true);
	}
	
	const removePostModal = (p) => {
	
	}
	
	const submitRemoveProduct = (p) => {
		// todo: submit removal
	}
	
	const submitRemovePost = (p) => {
		// todo: submit removal
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
				<Button variant={"outline-light"} style={mainButtonStyle} onClick={editProfile}>
					<FontAwesomeIcon icon={solid("user")} size={"2xl"}/>
					<div style={mainButtonText}>Edit<br/>Profile</div>
				</Button>
				<Button variant={"outline-light"} style={mainButtonStyle} onClick={newProduct}>
					<FontAwesomeIcon icon={solid("shopping-bag")} size={"2xl"}/>
					<div style={mainButtonText}>New<br/>Product</div>
				</Button>
				<Button variant={"outline-light"} style={mainButtonStyle} onClick={newPost}>
					<FontAwesomeIcon icon={solid("calendar-plus")} size={"2xl"}/>
					<div style={mainButtonText}>New<br/>Post</div>
				</Button>
			</div>
			
			<div className={'accordion'} style={{...accordionStyle, maxWidth: '380px'}} onClick={toggleAccordion}>
				<FontAwesomeIcon style={arrowStyle} icon={solid("angle-down")}/>
				Profile
				<div style={accordionBodyStyle} className={'shadow'}>
					
					<img src={profileImage + user.profilePicture} className='picture-preview mb-4' alt='Profile Picture'/>
					
					<div style={profileContentStyle}>
						<b>Username</b>
						<div>
							{user.username}
						</div>
					</div>
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
					
					{
						user.whatsapp ?
							<div style={profileContentStyle}>
								<b>Whatsapp</b>
								<div>
									{user.whatsapp}
								</div>
							</div>
							: ''
					}
					
					{
						user.whatsapp ?
							<div style={profileContentStyle}>
								<b>Prefer Whatsapp contact</b>
								<div>
									{user.preferWhatsapp ? 'Yes' : 'No'}
								</div>
							</div>
							: ''
					}
					
				</div>
			</div>
			
			
			<div className={'accordion'} style={{...accordionStyle, maxWidth: '380px'}} onClick={toggleAccordion}>
				<FontAwesomeIcon style={arrowStyle} icon={solid("angle-down")}/>
				Your Products
				<div style={accordionBodyStyle} className={'shadow'}>
					
					{
						products.map((p) => {
							if (p.seller != user._id) return ''
							return (<Card product={p}
							              productImage={productImage}
							              removeFn={removeProductModal}
							/>)
						})
					}
					
					{
						document.getElementsByClassName('card').length === 0 ?
							'You do not have any products at the moment' : ''
					}
				
				</div>
			</div>
			
			<Modal style={modalBgStyle} show={showRemoveProductModal} onHide={closeModal}>
				<Modal.Header style={{background: 'var(--primary-color)'}} closeButton>
					<Modal.Title>Remove {selectedProduct}</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{background: 'var(--primary-color)'}}>
					{
						'Are you sure you want to remove the listing for this product? ' +
						'You cannot undo this action.'
					}
				</Modal.Body>
				<Modal.Footer style={{background: 'var(--primary-color)'}}>
					<Button onClick={() => submitRemoveProduct(selectedProduct)} variant="secondary">
						Remove
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	)
}

export default Profile;