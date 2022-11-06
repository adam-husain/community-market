import React from "react";
import {Container} from "react-bootstrap";

function About(props) {
	
	const residences = props.residences;
	
	const quoteBox = {
		borderRadius: "10px",
		background: "var(--primary-color)",
		display: "inline-block"
	}
	return (<Container>
			<h1 className="my-3">Hello There 👋</h1>
			<p>
				I am the creator 👨‍💻 and the great mind 🧠 behind this project.
				I prefer to be anonymous, but you can call me <b>snyper</b>.<br/>
				Follow the <a href="https://www.instagram.com/myresidence.shop/" target="_blank">Instagram page</a> to
				keep up with the latest featured products.
			</p>
			<br/>
			<h3>What is it? 🤔</h3>
			<div className="my-3 p-3"
			     style={quoteBox}>
				One man's trash is another man's treasure
			</div>
			<p>
				The Residence Marketplace website helps you sell all your unwanted stuff 🗑️ in your room that
				may be useful for others 💎.
				<br/>
				The primary focus is on 3 aspects:
			</p>
			<ul>
				<li>Usability 🛠️ : Designed for a dumb user</li>
				<li>Performance 🏃 : Get your work done faster</li>
				<li>Privacy 🔐 : Only the required information is collected and securely stored. I do not sell
					any information this site collects.
				</li>
			</ul>
			
			<br/>
			<h3>Who is this for? 👥</h3>
			<div className="my-3 p-3"
			     style={quoteBox}>
				I plan to expand this website to other residences also.
			</div>
			<p>
				The website is designed for residents living in the following residences:
			</p>
			<ul>
				{
					Object.entries(residences).map(([k,r]) => {
						if (r.enabled == 0) return;
						const label = r.fullName;
						return (
							<li>{label}</li>
						)
					})
				}
			</ul>
			If you are not a resident of the above mentioned residences, you are not supposed to buy or sell
			in this website.
			This is done to ensure the safety of the residents.
			Users are urged to ensure they are interacting with personnel within their residence.
			
			<br/>
			<br/>
			
			<h3>Disclaimer ‼️</h3>
			<div className="my-3 p-3"
			     style={quoteBox}>
				Please be nice and respectful. I put a lot of work into this 😥.
			</div>
			<p>
				This website is intended only for some residences (see above <i>Who is this
				for</i> section).
				It is your responsibility to ensure you Buy or Sell to personnel within the
				residence.
				<br/>
				<b>I am not responsible for your safety, financial or legal issues that occur
					due to using this website 🙅.</b>
				You will simply have to be cautious when selling and interacting with other
				users.
				<br/>
				<b>This website has very limited moderator capabilities.</b>
				If you find obscene or offensive content 🔞 you can report it. The reported
				items will be removed
				by an automated moderation algorithm.
			</p>
			<br/>
			<br/>
		</Container>);
}

export default About;