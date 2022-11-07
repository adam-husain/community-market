import React, {useState} from "react";
import {Button, Container, Modal} from "react-bootstrap";
import Card from "./card";
import Header from "./header";

function Market({residences}) {
	
	const exampleProducts = [
		{
			name: 'iPhone 12',
			desc: 'desc',
			price: '1000',
			image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/4de62b68299019.5b603c2a5a02b.jpg'
		},
		{
			name: 'Sample Product',
			desc: 'desc',
			price: '12',
			image: 'https://myresidence.shop/img/products/default.jpeg'
		},
		{
			name: 'Camera',
			desc: 'desc',
			price: '3000',
			image: 'https://static3.depositphotos.com/1007298/228/i/450/depositphotos_2284302-stock-photo-digital-slr-camera.jpg'
		},
		{
			name: 'Keyboard',
			desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque commodo nulla nec iaculis tristique. Donec ultricies efficitur elit, eget ullamcorper mauris accumsan eget. Nunc libero lacus, porta sed pharetra non, interdum mollis libero. Donec tincidunt ullamcorper velit, id porta enim',
			price: '50',
			image: 'https://www.itlinks.com.au/wp-content/uploads/2018/05/Keyboard-Logitech-K120.jpg'
		}
	]
	
	const pageStyle = {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center'
	};
	
	const modalBgStyle = {
		backdropFilter: 'blur(8px)'
	}
	
	
	const [show, setShow] = useState(false);
	const [modalTitle, setModalTitle] = useState('');
	const [modalBody, setModalBody] = useState('');
	const [modalAction, setModalAction] = useState(-1);
	const [selectedProduct, setSelectedProduct] = useState({});
	let modalSubmit = () => {}
	
	const contact = (p) => {
		setModalTitle('Purchase ' + p.name);
		setModalBody('If you are interested in this product, ' +
			'you can start chatting by clicking on the Chat button below. ' +
			'You will be redirected to the Chat window');
		modalSubmit = () => alert('Chat for ' + p.name);
	}
	
	const report = (p) => {
		setModalTitle('Report ' + p.name);
		setModalBody('If you are interested in this product, ' +
			'you can start chatting by clicking on the Chat button below. ' +
			'You will be redirected to the Chat window');
	}
	
	const remove = (p) => {
	
	}
	
	const handleClose = () => setShow(false);
	const handleShow = (product, action) => {
		switch (action) {
			case 0:
				contact(product);
				break;
			case 1:
				report(product);
				break;
			case 2:
				remove(product);
				break;
			default:
				console.error('Internal error. Action undefined.')
		}
		
		setSelectedProduct(product);
		setModalAction(action);
		setShow(true);
	}
	const showChat = (p) => {
		// todo: Show chat window
		alert('Chat window for ' + p.name);
	}
	const submitReport = (p) => {
		// todo: Submit report
	}
	const submitRemove = (p) => {
		// todo: submit removal
	}
	
	
	
	return (
		<Container>
			<Header title={'Market'} residences={residences} profileButtonText={'Sell Items'} />
			
			<div style={pageStyle}>
				{
					exampleProducts.map((p) => {
						return (<Card product={p} show={handleShow}
						              hasContact={true}
						              hasReport={true}
						              hasRemove={false}
						/>);
					})
				}
			</div>
			
			<Modal style={modalBgStyle} show={show} onHide={handleClose}>
				<Modal.Header style={{background: 'var(--primary-color)'}} closeButton>
					<Modal.Title>{modalTitle}</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{background: 'var(--primary-color)'}}>{modalBody}</Modal.Body>
				<Modal.Footer style={{background: 'var(--primary-color)'}}>
					{
						modalAction === 0 ? (
							<Button onClick={() => showChat(selectedProduct)} variant="secondary">
								Chat
							</Button>
						) : modalAction === 1 ? (
							<Button onClick={() => submitReport(selectedProduct)} variant="secondary">
								Report
							</Button>
						) : modalAction === 2 ? (
							<Button onClick={() => submitRemove(selectedProduct)} variant="secondary">
								Remove
							</Button>
						) : ''
					}
				</Modal.Footer>
			</Modal>
		</Container>
	);
}

export default Market;