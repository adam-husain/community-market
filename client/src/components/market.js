import React, {useEffect, useState} from "react";
import {Button, Container, Modal, Toast} from "react-bootstrap";
import Card from "./card";
import Header from "./header";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";

function Market({residences, products, productImage, user, apiV1}) {
	
	const navigate = useNavigate();
	const cookies = new Cookies();
	const sortList = ['Newest', 'Oldest', 'Lowest Price', 'Highest Price'];
	const maxItemsPerPage = 12;
	const pageCount = Math.ceil(products.length / maxItemsPerPage);
	const [displayProducts, setDisplayProducts] = useState([]);
	const [showReportSuccess, setShowReportSuccess] = useState(false);
	
	useEffect(() => {
		if (products.length === 0) {
			navigate('/')
			return;
		}
		pageNav(1);
		sortBy(0);
	}, [])
	
	const pageStyle = {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center'
	};
	
	const modalBgStyle = {
		backdropFilter: 'blur(8px)'
	}
	
	const [showContactModal, setShowContactModal] = useState(false);
	const [showReportModal, setShowReportModal] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState({});
	
	const contactModal = (p) => {
		setSelectedProduct(p);
		setShowContactModal(true);
	}
	
	const reportModal = (p) => {
		setSelectedProduct(p);
		setShowReportModal(true);
	}
	
	const closeModal = () => {
		setShowContactModal(false);
		setShowReportModal(false);
	}
	
	const showChat = async (product) => {
		// Check for a chat-session
		// Create and save a unique chat-session for this user
		let chatSession = cookies.get('chat-session');
		if (!chatSession) {
			chatSession = crypto.randomUUID();
			cookies.set('chat-session', chatSession, { path: '/', maxAge: 51840000 });
		}
		
		const data = {
			chatSession,
			product: product._id,
			buyer: user._id, // Can be undefined
		};
		const response = await axios.post(apiV1 + 'chat/new', data);
		if (response.data.status) {
			navigate('/chats#' + response.data.result);
		}
	}
	const submitReport = async (p) => {
		setShowReportModal(false);
		const data = {
			id: p._id
		}
		const response = await axios.post(apiV1 + 'product/report', data);
		if (response.data.status) {
			setShowReportSuccess(true);
		}
	}
	
	const [sort, setSort] = useState(0);
	const sortBy = (sortId) => {
		setSort(sortId);
		const sort0 = () => {
			return products.sort(function(a, b) {
				const x = a.date; const y = b.date;
				return ((x < y) ? 1 : ((x > y) ? -1 : 0));
			});
		}
		
		const sort1 = () => {
			return products.sort(function(a, b) {
				const x = a.date; const y = b.date;
				return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			});
		}
		
		const sort2 = () => {
			return products.sort(function(a, b) {
				const x = a.price; const y = b.price;
				return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			});
		}
		
		const sort3 = () => {
			return products.sort(function(a, b) {
				const x = a.price; const y = b.price;
				return ((x < y) ? 1 : ((x > y) ? -1 : 0));
			});
		}
		
		switch (sortId) {
			case 0:
				products = sort0();
				break;
			case 1:
				products = sort1();
				break;
			case 2:
				products = sort2();
				break;
			case 3:
				products = sort3();
				break
			default:
				break;
		}
		
		pageNav(page)
	}
	
	const [page, setPage] = useState(1);
	const pageNav = (pageNum) => {
		setPage(pageNum);
		const start = (pageNum - 1) * maxItemsPerPage;
		const end = start + maxItemsPerPage;
		setDisplayProducts(products.slice(start, end));
	}
	
	const editPage = () => {
		navigate('/product');
	}
	
	return (
		<Container>
			<Toast delay={2000} show={showReportSuccess} onClose={() => setShowReportSuccess(false)} autohide>
				<Toast.Header>
					<strong className="me-auto">Report Successful</strong>
					<small></small>
				</Toast.Header>
			</Toast>
			<Header title={'Market'}
			        residences={residences}
			        sortBy={sortBy}
			        currentSort={sort}
			        sortList={sortList}
			        buttonText={'Sell Items'}
			        buttonFn={editPage}
			        pageNav={pageNav}
			        currentPage={page}
			        pageCount={pageCount} />
			
			<div style={pageStyle}>
				{
					displayProducts.map((p) => {
						if (user._id == p.seller)
							return '';
						return (<Card product={p}
						              residences={residences}
						              productImage={productImage}
						              contactFn={contactModal}
						              reportFn={reportModal} />);
					})
				}
			</div>
			
			<Modal style={modalBgStyle} show={showContactModal} onHide={closeModal}>
				<Modal.Header style={{background: 'var(--primary-color)'}} closeButton>
					<Modal.Title>{'Purchase ' + selectedProduct.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{background: 'var(--primary-color)'}}>
					{
						'If you are interested in this product, ' +
						'you can start chatting by clicking on the Chat button below. ' +
						'You will be redirected to the Chat window'
					}
				</Modal.Body>
				<Modal.Footer style={{background: 'var(--primary-color)'}}>
					<Button onClick={() => showChat(selectedProduct)} variant="secondary">
						Chat
					</Button>
				</Modal.Footer>
			</Modal>
			
			<Modal style={modalBgStyle} show={showReportModal} onHide={closeModal}>
				<Modal.Header style={{background: 'var(--primary-color)'}} closeButton>
					<Modal.Title>Found anything offensive or inappropriate?</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{background: 'var(--primary-color)'}}>
					{
						'Submit a report and the listing will be evaluated ' +
						'to see if it follows the community guidelines'
					}
				</Modal.Body>
				<Modal.Footer style={{background: 'var(--primary-color)'}}>
					<Button onClick={() => submitReport(selectedProduct)} variant="secondary">
						Report
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
}

export default Market;