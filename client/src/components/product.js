import React from 'react';
import {Button, Container, Form, InputGroup} from "react-bootstrap";

function Product({residences}) {
	
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
	const DefaultImage = 'https://myresidence.shop/img/products/default.jpeg';
	
	return (
		<Container>
			<div className='custom-header shadow'>
				<h2>New Product</h2><br/>
				<small>Create a new product listing here</small>
			</div>
			
			<Form style={formStyle} className='my-5 p-4 shadow'>
				<Form.Group className="mb-3">
					<Form.Label>Title</Form.Label>
					<Form.Control type="text" placeholder="<20 characters" required/>
					<Form.Text className="text-muted">
						Choose a small title
					</Form.Text>
				</Form.Group>
				
				<Form.Group className="mb-3">
					<Form.Label>Description</Form.Label>
					<Form.Control
						as="textarea"
						placeholder="<100 characters"
						style={{ height: '100px' }}
						required
					/>
					<Form.Text className="text-muted">
						Give a brief description
					</Form.Text>
				</Form.Group>
				
				<Form.Group className="mb-3">
					<Form.Label name='pronouns'>Select a residence you want to sell to</Form.Label>
					<Form.Select name='pronouns' defaultValue={0}>
						{
							Object.entries(residences).map(([k, r]) => {
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
					<Form.Control placeholder="Price" required/>
				</InputGroup>
				
				<Form.Group className="mb-5">
					<Form.Label>Upload a picture</Form.Label>
					<Form.Control type="file"/>
					<img style={previewStyle} src={DefaultImage} alt='Profile picture preview'/>
				</Form.Group>
				
				<Button variant="secondary" type="submit">
					Submit
				</Button>
			</Form>
		</Container>
	)
}

export default Product;