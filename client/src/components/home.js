import React, { useState } from "react";
import Cookies from "universal-cookie";
import Container from "react-bootstrap/Container";
import {Button, Form, Toast,} from "react-bootstrap";

import imgResidences from '../images/residences.svg';

function Home(props) {
	const residences = props.residences;
	
	const imgStyle = {
		opacity: 0.5,
		zIndex: -5,
		width: "-webkit-fill-available",
		position: "fixed",
		mixBlendMode: 'overlay'
	};
	
	const [show, setShow] = useState(false);
	const selectedRes = {}
	for (const r of residences) {
		selectedRes[r.shortName] = r.selected;
	}
	
	const handleChange = (e) => {
		const name = e.target.id;
		
		selectedRes[name] = !selectedRes[name];
		if (selectedRes[name])
			e.target.classList.add('checked')
		else e.target.classList.remove('checked')
		document.getElementById('select-error').style.opacity = 0;
		
		const cookies = new Cookies();
		cookies.set(name, selectedRes[name] ? '1' : '0')
	}
	
	const handleSubmit = (e) => {
		let anyChecked = false;
		for (const r in selectedRes) {
			if (selectedRes[r]) {
				anyChecked = true;
				break;
			}
		}
		
		if (selectedRes === {} || !anyChecked) {
			document.getElementById('select-error').style.opacity = 1;
			return
		}
		
		setShow(true);
	}
	
	return (
		<div>
			<img src={imgResidences} style={imgStyle} alt='Residences background'/>
			<Container>
				
				<div className='my-5'/>
				<h1>
					<b>RESIDENCE MARKET</b> <br/><br/>
					<sub>An online marketplace and forum for your residence.<br/>
						This is a student run venture to build a better community experience.</sub>
				</h1>
				
				<div className='my-5'/>
				
				<p>
					Select your residence. <br/>
					By doing so, only relevant products and posts will be shown to you.
					You can change this anytime.
				</p>
				
				<div>
					{
						residences.map((r, i) => {
							if (r.enabled == 0) return;
							const label = r.fullName;
							const id = r.shortName;
							return (
								<div>
									<button
										className={selectedRes[id] ? "custom-checkbox checked" : "custom-checkbox"}
										id={id}
										onClick={handleChange}
									/>
									{label}
								</div>
							)
						})
					}
					
					<Form.Text style={{opacity: 0}} id="select-error">
						You need to select at least one residence
					</Form.Text>
					<br/>
					
					<Button className={"mb-3"} id='changeBtn' variant="secondary" onClick={handleSubmit}>
						Submit
					</Button>
					<Toast onClose={() => setShow(false)} show={show} delay={1000} autohide>
						<Toast.Header>
							<strong className="me-auto">SAVED RESIDENCE PREFERENCE</strong>
						</Toast.Header>
					</Toast>
					
				</div>
			</Container>
		</div>
	);
}

export default Home;
