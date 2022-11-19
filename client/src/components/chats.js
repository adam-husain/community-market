import React, {useEffect, useState} from 'react';
import {Alert, Badge, Button, Container, ListGroup} from "react-bootstrap";
import './styles/chats.css';
import axios from "axios";
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro';

function Chats({user, profileImage, apiV1}) {
	
	const navigate = useNavigate();
	const cookies = new Cookies();
	const [showChat, setShowChat] = useState(false);
	const [chats, setChats] = useState([]);
	const [currentChat, setCurrentChat] = useState({});
	
	useEffect(setup, []);
	function setup() {
		setShowChat(!!getChatID());
		updateChatsInterval()
			.catch((err) => console.error(err));
	}
	
	/**
	 * Recursively check for new chat messages
	 */
	async function updateChatsInterval() {
		const updateInterval = 6;
		if (!getChatID())
			await updateAllChats();
		else
			await updateCurrentChat();
		
		if (window.location.href.includes('/chats'))
			setTimeout(updateChatsInterval, updateInterval * 1000);
	}
	
	/**
	 * Check for new chat messages once
	 */
	async function updateAllChats() {
		const chatSession = cookies.get('chat-session');
		if (!chatSession) {
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
	
	async function updateCurrentChat() {
		const chatId = getChatID();
		const response = await axios.get(apiV1 + 'chat/' + chatId);
		if (response.data.status)
			setCurrentChat(response.data.result);
	}
	
	function closeChat() {
		window.location.href = '#';
		updateAllChats().then(() => setShowChat(false));
	}
	
	function openChat(id) {
		window.location.href = '#' + id;
		updateCurrentChat().then(() => setShowChat(true))
	}
	
	function deleteChat(id) {
		if (!currentChat._id) return;
		axios.post(apiV1 + 'chat/delete', {id})
			.then(() => closeChat())
			.catch((e) => console.error(e));
	}
	
	function isSeller(e) {
		if (!e || !e.seller) return false;
		return user && user._id === e.seller._id;
	}
	function getOtherProfilePic(e) {
		if (!e || !e.seller || !e.buyer) return 'default.jpg';
		let profilePic = isSeller(e) ? e.buyer.profilePicture : e.seller.profilePicture;
		if (!profilePic) profilePic = 'default.jpg';
		
		return profilePic
	}
	
	function getChatID() {
		return window.location.hash.slice(1);
	}
	
	async function sendChat(e) {
		e.preventDefault();
		if (!currentChat) return;
		
		const chatSession = currentChat.chatSession;
		const inputField = e.target[0];
		const message = inputField.value;
		inputField.value = '';
		
		const sender = user._id;
		const data = {
			chatSession,
			message,
			sender
		}
		const response = await axios.post(apiV1 + 'chat/send', data);
		await updateCurrentChat()
	}
	
	return (
		<Container>
			<div>
				<h2 className='my-5 mx-3'>
					Your chats
				</h2>
				{
					!chats.length ? <Alert variant='info'>
						You do not have any chats at the moment
					</Alert> : ''
				}
				
				<ListGroup>
					{
						chats.map((e) => {
							const id = e._id;
							let profilePic = profileImage + getOtherProfilePic(e);
							let name = isSeller(e) ? e.buyer.name : e.seller.name;
							if (!name) name = 'ANONYMOUS';
							const product = e.product.title;
							return (
								<ListGroup.Item className='shadow-lg mb-3' action onClick={()=>openChat(id)}>
									<img className='smallProfile shadow'
									     src={profilePic} alt='profile picture'/>
									<b>{name}</b><br/>
									<small className='text-muted'>
										Item: {product}<br/>
										ID: {id}
									</small>
								</ListGroup.Item>
							)
						})
					}
				</ListGroup>
			</div>
			
			<div className={'chat-panel ' + (showChat ? 'show' : '')}>
				<div className='chat-header'>
					<button onClick={closeChat}
					        style={{background: 'none', border: 'none', width: '30px', height: '30px', marginLeft: '10px'}}>
						<FontAwesomeIcon style={{color: 'white'}} icon={solid("close")} size={'xl'}/>
					</button>
					<img className='smallProfile shadow' style={{position: 'absolute', left: '50%', margin: 'auto'}}
					     src={profileImage + getOtherProfilePic(currentChat)} alt='profile picture'/>
					<div style={{display: 'inline-flex', marginLeft: '20px'}}>
						{'Adam'}
					</div>
					<Button variant='danger' onClick={()=>deleteChat(currentChat._id)}
					        style={{float: 'right', marginRight: '10px'}}>
						<FontAwesomeIcon style={{color: 'white'}} icon={solid("trash")} size={'xl'}/>
					</Button>
				</div>
				
				<div className='container chat-body shadow-lg'>
					{
						currentChat.messages ?
						currentChat.messages.map((e) => {
							const isMine = (user && e.sender === user._id) || (!user && !e.sender);
							return (
								<div className={'bubble ' + (isMine ? 'alt' : 'white')}>
									{e.message}
								</div>
							)
						}) : ''
					}
				</div>
				
				<form onSubmit={sendChat} className='container chat-input shadow'>
					<input type='text' placeholder='Enter your message' onChange={
						(e) => {
							const sendBtn = document.getElementById('send-button');
							if (e.target.value) sendBtn.classList.remove('hide');
							else sendBtn.classList.add('hide');
						}
					}/>
					<button type='submit' id='send-button' className='chat-send shadow-sm hide'>
						<FontAwesomeIcon style={{color: 'white'}} icon={solid("paper-plane")} size={'xl'}/>
					</button>
				</form>
				
			</div>
		</Container>
	);
}

export default Chats;