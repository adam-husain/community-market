import React from "react";
import {Container} from "react-bootstrap";

function Contact() {

	return (
		<Container>
			<h1 className="my-3">Hello There 👋</h1>
			<p>
				You can send an email to <a href="mailto:enquiry@myresidence.shop">enquiry@myresidence.shop</a><br/>
				Or send a message to the <a href="https://www.instagram.com/myresidence.shop/" target="_blank">Instagram page</a>
			</p>
		</Container>);
}

export default Contact;