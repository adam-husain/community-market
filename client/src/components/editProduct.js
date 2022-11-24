import React, {useEffect, useState} from 'react';
import {Alert, Button, Container, Form, InputGroup} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function EditProduct({residences, productImage, apiV1, user, refresh, editFn}) {
	
	const navigate = useNavigate();
	
	const DefaultImage = productImage + 'default.jpg';
	const [previewUrl, setPreviewUrl] = useState(DefaultImage);
	const [currentProduct, setCurrentProduct] = useState({});
	const [alertMessage, setAlertMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	
	if (user.name == undefined) {
		navigate('/market');
	}
	
	const productId = window.location.hash.slice(1);
	if (!productId) {
		navigate('/market');
		return;
	}
	
	const data = {id: productId, seller: user._id};
	axios.post(apiV1 + 'product', data)
		.then(response => {
			if (response.data.status) {
				const product = response.data.result;
				setPreviewUrl(productImage + product.picture);
				setCurrentProduct(product);
			}
			else {
				console.log(response.data);
				navigate('/market');
			}
		});
	
	
	const formStyle = {
		borderRadius: '10px',
		display: 'block',
		margin: 'auto',
		maxWidth: '400px',
	}
	
	const previewStyle = {
		borderRadius: '10px',
		maxWidth: '200px',
		maxHeight: '200px',
		margin: '20px auto',
		display: 'block'
	}
	
	function previewImage(e) {
		if (!e.target.files || e.target.files.length === 0) {
			return
		}
		
		const file = e.target.files[0];
		const objectUrl = URL.createObjectURL(file);
		setPreviewUrl(objectUrl);
	}
	
	async function submit(e) {
		e.preventDefault();
		clearErrors();
		if (isLoading) return;
		
		const target = e.target;
		const title = target[0].value;
		const description = target[1].value;
		const residence = target[2].value;
		const price = target[3].value;
		const picture = target[4].files[0];
		const seller = user._id;
		
		// Check title
		if (title.length > 20) {
			target[0].classList.add('is-invalid');
			setAlertMessage('Title is too long');
			return;
		}
		
		// Check description
		if (description.length > 100) {
			target[1].classList.add('is-invalid');
			setAlertMessage('Description is too long');
			return;
		}
		
		// Check price
		if (parseInt(price) > 10000) {
			target[3].classList.add('is-invalid');
			setAlertMessage('Price is too... pricey');
			return;
		}
		
		const data = new FormData();
		data.append('id', currentProduct._id);
		data.append('title', title);
		data.append('description', description);
		data.append('residence', residence);
		data.append('price', price);
		data.append('picture', picture);
		data.append('seller', seller);
		
		setIsLoading(true);
		const result = await axios.post(apiV1 + 'product/edit', data,
			{headers: {'Content-Type': 'multipart/form-data'}});
		setIsLoading(false);
		
		if (result.data.status) {
			await refresh();
			navigate('/profile');
		}
		else {
			setAlertMessage('Could not update your product! Try again later.')
		}
	}
	
	function clearErrors() {
		const formElems = document.getElementsByClassName('form-control');
		for (const e of formElems) {
			e.classList.remove('is-invalid');
		}
		
		setAlertMessage('');
	}
	
	return (
		<Container>
			<div className='custom-header shadow'>
				<h2>New Product</h2><br/>
				<small>Create a new product listing here</small>
			</div>
			{
				alertMessage === '' ? '' : (
					<Alert variant='danger'>
						{alertMessage}
					</Alert>
				)
			}
			<Form onSubmit={submit} style={formStyle} className='my-3 p-4 shadow'>
				<Form.Group className="mb-3">
					<Form.Label>Title</Form.Label>
					<Form.Control name='title' type="text" placeholder="<20 characters" required defaultValue={currentProduct.title}/>
					<Form.Text className="text-muted">
						Choose a small title
					</Form.Text>
				</Form.Group>
				
				<Form.Group className="mb-3">
					<Form.Label>Description</Form.Label>
					<Form.Control
						name='description'
						as="textarea"
						placeholder="<100 characters"
						style={{ height: '100px' }}
						required
						defaultValue={currentProduct.description}
					/>
					<Form.Text className="text-muted">
						Give a brief description
					</Form.Text>
				</Form.Group>
				
				<Form.Group className="mb-3">
					<Form.Label>Select a residence you want to sell to</Form.Label>
					<Form.Select name='residence' defaultValue={currentProduct.residence}>
						{
							residences.map(r => {
								if (r.enabled === 0) return ''
								return (
									<option value={r.id}>{r.fullName}</option>
								)
							})
						}
					</Form.Select>
					<Form.Text className="text-muted">
						Your listing will only be shown under the selected residence
					</Form.Text>
				</Form.Group>
				
				<InputGroup className="mb-3">
					<InputGroup.Text>RM</InputGroup.Text>
					<Form.Control defaultValue={currentProduct.price} name='price' placeholder="Price" required/>
				</InputGroup>
				
				<Form.Group className="mb-5">
					<Form.Label>Upload a picture</Form.Label>
					<Form.Control onChange={previewImage} name='productPicture' type="file" accept="image/*"/>
					<img style={previewStyle} src={previewUrl} alt='Profile picture preview'/>
				</Form.Group>
				
				<Button variant="secondary" type="submit">
					Submit
				</Button>
			</Form>
		</Container>
	)
}

export default EditProduct;