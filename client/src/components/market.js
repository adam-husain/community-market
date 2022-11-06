import React, {useCallback, useState} from "react";
import {Button, Container, Dropdown, Modal, Pagination} from "react-bootstrap";
import Card from "./card";

function Market(props) {
	
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
	
	const residences = props.residences;
	
	const filterStyle = {
		background: "var(--primary-color)",
		margin: "20px 0 0 0",
		padding: "10px",
		width: "min-content",
		borderRadius: "10px",
		display: "flex"
	};
	
	const pageStyle = {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center'
	};
	
	const modalBgStyle = {
		backdropFilter: 'blur(8px)'
	}
	
	const filters = ['Newest', 'Oldest', 'Lowest Price', 'Highest Price'];
	
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
	
	const activePage = 1;
	const pageNums = [];
	for (let number = 1; number <= 5; number++) {
		pageNums.push(
			<Pagination.Item key={number} active={number === activePage}>
				{number}
			</Pagination.Item>,
		);
	}
	
	return (
		<Container>
			<div className="custom-header shadow">
				<h2>Market</h2><br/>
				{
					Object.entries(residences).map(([k, r]) => {
						if (r.selected)
						return (<div className="custom-tags shadow">
							{r.fullName}
						</div>)
					})
				}
				
				<div className="shadow" style={filterStyle}>
					<Pagination className={'my-auto me-4'}>
						{pageNums}
					</Pagination>
					
					<Dropdown>
						<Dropdown.Toggle variant="secondary" id="filter-dropdown">
							Newest
						</Dropdown.Toggle>
						
						<Dropdown.Menu>
							{
								filters.map((f) => {
									return (
										<Dropdown.Item href="#/action-1">{f}</Dropdown.Item>
									)
								})
							}
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</div>
			
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