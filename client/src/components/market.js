import React, {useState} from "react";
import {Button, Container, Modal} from "react-bootstrap";
import Card from "./card";
import Header from "./header";

function Market({residences, products, user}) {
	
	const sortList = ['Newest', 'Oldest', 'Lowest Price', 'Highest Price'];
	const maxItemsPerPage = 12;
	const pageCount = Math.ceil(products.length / maxItemsPerPage);
	
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
	
	const contact = (p) => {
		setModalTitle('Purchase ' + p.title);
		setModalBody('If you are interested in this product, ' +
			'you can start chatting by clicking on the Chat button below. ' +
			'You will be redirected to the Chat window');
	}
	
	const report = (p) => {
		setModalTitle('Found anything offensive or inappropriate?');
		setModalBody('Submit a report and the listing will be evaluated ' +
			'to see if it follows the community guidelines');
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
		alert('Chat window for ' + p.title);
	}
	const submitReport = (p) => {
		// todo: Submit report
	}
	const submitRemove = (p) => {
		// todo: submit removal
	}
	
	const [sort, setSort] = useState(0);
	const sortBy = (sortId) => {
		setSort(sortId);
	}
	
	const [page, setPage] = useState(1);
	const pageNav = (pageNum) => {
		setPage(pageNum);
	}
	
	return (
		<Container>
			<Header title={'Market'}
			        residences={residences}
			        sortBy={sortBy}
			        currentSort={sort}
			        sortList={sortList}
			        profileButtonText={'Sell Items'}
			        pageNav={pageNav}
			        currentPage={page}
			        pageCount={pageCount} />
			
			<div style={pageStyle}>
				{
					products.map((p) => {
						if (user != undefined && user._id == p.seller)
							return '';
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