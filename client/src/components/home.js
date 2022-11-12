import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";
import Container from "react-bootstrap/Container";
import {Button, Form, Toast,} from "react-bootstrap";

import imgResidences from '../images/residences.svg';

function Home({residences}) {
	const imgStyle = {
		opacity: 0.5, zIndex: -5, width: "-webkit-fill-available", position: "fixed", mixBlendMode: 'overlay'
	};
	
	const navigate = useNavigate();
	const [show, setShow] = useState(false);
	
	const handleChange = (e) => {
		const id = e.target.id;
		
		residences[id].selected = !residences[id].selected;
		document.getElementById('select-error').style.opacity = 0;
		
		const cookies = new Cookies();
		cookies.set(id, residences[id].selected ? '1' : '0')
	}
	
	const handleSubmit = (e) => {
		let anyChecked = false;
		for (const r in residences) {
			if (residences[r].selected) {
				anyChecked = true;
				break;
			}
		}
		
		if (!anyChecked) {
			document.getElementById('select-error').style.opacity = 1;
			return
		}
		
		navigate('/market')
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
							if (r.enabled == 0) return '';
							const label = r.fullName;
							const id = i;
							return (
								<div className="checkbox-wrapper"
								     style={{display: "flex", alignItems: "end"}}>
									<input type="checkbox" id={id} onChange={handleChange} defaultChecked={r.selected}/>
									<label htmlFor={id}>
										<div className="tick_mark"></div>
									</label>
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
						Let's Go
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
