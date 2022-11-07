import React from 'react';
import {Container} from "react-bootstrap";

function Help() {
	return (
		<Container>
			<h1 className="my-3">Hello There 👋</h1>
			
			<p>
				This page is all about helping you get started on this website. We shall be covering some important
				stuff but if you feel like you still haven't understood, drop us your question on the Contact form and
				I'll answer your queries.
			</p>
			
			<br/>
			
			<h3>How do I buy? 🛒</h3>
			<div className="quote-box my-3 p-3">
				You have full authority to reject a seller, even after meeting up, if you find any faults with the
				product.
			</div>
			<p>
				Please go through the following checklist before buying:
			</p>
			<ul>
				<li>The contact form has a direct link to the seller's Whatsapp chat.</li>
				<li>Remember to be polite.</li>
				<li>Try to ask all the important questions before meeting up. This can prevent
					wasting yours and the seller's time
				</li>
				<li>Do not entertain trolls or suspicious sellers.</li>
				<li>Arrange a meeting place within your residence. If the seller requests meeting outside the
					residence,
					try to meet up in a public place with other people around you.
				</li>
				<li>Be on time at the right place.</li>
				<li>Check the product properly. The seller is not obliged to entertain any issues with the product
					after the sale is done.
				</li>
				<li>Ensure the money and product is transferred on the spot.</li>
				<li>Congrats! You just saved time, money and the environment.</li>
			</ul>
			<br/>
			
			<h3>How do I sell? 💰</h3>
			<div className="quote-box my-3 p-3">
				Price as low as you can. The goal is to reduce waste, not to profit. I recommend going 0 RM
				(Free) if you can.
			</div>
			<p>
				<b>You can host services too, like a Printing Service or Event Invitations.</b> Please go
				through the following checklists for selling your product or service.
			</p>
			
			<h5>BEFORE SELLING</h5>
			<ul>
				<li>You have registered an account. This is to ensure you can keep track of all your listings.
				</li>
				<li>You have the product with you.</li>
				<li>The product is working as intended.</li>
				<li>The product is not illegal in Malaysia.</li>
			</ul>
			
			<br/>
			
			<h5>PRODUCT DETAILS</h5>
			<ul>
				<li><b>Title: </b>Pick a small title, usually one word. For example, 'Keyboard' or 'Clock'.
				</li>
				<li><b>Description: </b>Provide the following details:
					<ol>
						<li>Brand</li>
						<li>Usage frequency (like 'used once' or 'used frequently')</li>
						<li>Expiry date if perishable</li>
						<li>Any faults or blemishes</li>
					</ol>
				</li>
				<li><b>Residence: </b>Select your residence.</li>
				<li><b>Price: </b>Provide a good price, depending on the general demand for it. Remember to
					keep it low to
					make it easier to sell. You can only enter less than RM 10,000 price.
				</li>
				<li><b>Image: </b>Upload a quality picture with good lighting. This is optional, but it will
					help
					you get buyers.
				</li>
			</ul>
			<br/>
			<h4>WHEN CONTACTED</h4>
			<ul>
				<li>Remember to be polite.</li>
				<li>Try to answer to the best of your knowledge.</li>
				<li>Do not entertain trolls or suspicious users.</li>
				<li>Arrange a meeting place within your residence. If the buyer requests meeting outside
					the residence,
					try to meet up in a public place with other people around you.
				</li>
				<li>Be on time at the right place.</li>
				<li>Allow the buyer to check out the product.</li>
				<li>Ensure the money is transferred on the spot.</li>
				<li>Don't forget to delete your product listing after the sale is done.</li>
				<li>Congrats! You have helped reduce waste on this planet.</li>
			</ul>
			<br/>
			<br/>
		</Container>
	)
}

export default Help;