import React, {useEffect, useState} from 'react';
import {Badge, Container, ListGroup} from "react-bootstrap";
import './styles/chats.css';
import axios from "axios";
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro';

function Chats({user, profileImage, apiV1}) {
	
	const navigate = useNavigate();
	const cookies = new Cookies();
	const [showChat, setShowChat] = useState(false);
	const [chats, setChats] = useState([]);
	
	useEffect(setup, []);
	function setup() {
		setShowChat(!!getChatID());
		updateChatsInterval();
	}
	
	/**
	 * Recursively check for new chat messages
	 */
	function updateChatsInterval() {
		const updateInterval = 5;
		updateChats().then(() => {
			if (window.location.href.includes('chat'))
				setTimeout(updateChatsInterval, updateInterval * 1000);
		});
	}
	
	/**
	 * Check for new chat messages once
	 */
	async function updateChats() {
		const chatSession = cookies.get('chat-session');
		if (!chatSession) {
			navigate('/market');
			return;
		}
		
		const data = {
			chatSession,
			userId: user._id
		}
		const response = await axios.post(apiV1 + 'chat/all', data);
		if (response.data.status) {
			setChats(response.data.result);
		}
	}
	
	function closeChat() {
		window.location.href = '#';
		setShowChat(false);
	}
	
	function openChat(id) {
		window.location.href = '#' + id;
		setShowChat(true);
	}
	
	function getChatID() {
		return window.location.hash.slice(1);
	}
	
	return (
		<Container>
			<div>
				<h2 className='my-5 mx-3'>
					Your chats
				</h2>
				<ListGroup>
					{
						chats.map((e) => {
							console.log(e);
							const isSeller = user && user._id === e.seller._id;
							let profilePic = isSeller ? e.buyer.profilePicture : e.seller.profilePicture;
							if (!profilePic) profilePic = 'default.jpg';
							let name = isSeller ? e.buyer.name : e.seller.name;
							if (!name) name = 'ANONYMOUS';
							const product = e.product.title;
							return (
								<ListGroup.Item className='shadow-lg mb-3' action onClick={()=>openChat(e._id)}>
									<Badge className='badge' bg="primary">NEW</Badge>
									<img className='smallProfile shadow'
									     src={profileImage + profilePic} alt='profile picture'/>
									<b>{name}</b><br/>
									<small className='text-muted'>
										Item: {product}<br/>
										ID: {e._id}
									</small>
								</ListGroup.Item>
							)
						})
					}
					
				</ListGroup>
			</div>
			
			<div className={'chat-panel ' + (showChat ? 'show' : '')}>
				<div className='chat-header'>
					<button onClick={closeChat} style={{background: 'none', border: 'none', width: '30px', height: '30px'}}>
						<FontAwesomeIcon style={{color: 'white'}} icon={solid("close")} size={'xl'}/>
					</button>
					<img className='smallProfile shadow' style={{position: 'absolute', right: '0'}}
					     src={'https://i.imgur.com/e05N86L.jpg'} alt='profile picture'/>
					<div style={{display: 'inline-flex', marginLeft: '20px'}}>
						{'Adam'}
					</div>
				</div>
				
				<div className='container chat-body shadow-lg'>
					<div className='bubble'>
						Hello
					</div>
					<div className='bubble alt white'>
						Hello
					</div>
				</div>
				
				<div className='container chat-input shadow'>
					<input type='text' placeholder='Enter your message' onChange={
						(e) => {
							const sendBtn = document.getElementById('send-button');
							if (e.target.value) sendBtn.classList.remove('hide');
							else sendBtn.classList.add('hide');
						}
					}/>
					<button id='send-button' className='chat-send shadow-sm hide'>
						<FontAwesomeIcon style={{color: 'white'}} icon={solid("paper-plane")} size={'xl'}/>
					</button>
				</div>
				
			</div>
		</Container>
	);
}

export default Chats;