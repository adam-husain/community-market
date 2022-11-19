import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";
import Container from "react-bootstrap/Container";
import {Button, Form, Toast,} from "react-bootstrap";

import imgResidences from '../images/residences.svg';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

function Home({residences}) {
	const imgStyle = {
		opacity: 0.5, zIndex: -5, width: "-webkit-fill-available", position: "fixed", mixBlendMode: 'overlay'
	};
	
	const navigate = useNavigate();
	
	const mainButtonStyle = {
		width: '120px',
		height: '120px',
		borderRadius: '20px',
		margin: '20px',
	}
	const mainButtonText = {
		fontSize: '14px',
		marginTop: '5px'
	}
	
	const createCheckbox = (id, label, onChange, defaultChecked = false) => {
		return (
			<div className="checkbox-wrapper"
			     style={{display: "flex", alignItems: "end"}}>
				<input type="checkbox" id={id} onChange={onChange} defaultChecked={defaultChecked}/>
				<label htmlFor={id}>
					<div className="tick_mark"></div>
				</label>
				{label}
			</div>
		)
	}
	
	const handleSubmit = (e) => {
		
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
				
				<div style={{marginTop: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '380px'}}>
					<Button variant={"outline-light"} style={mainButtonStyle} onClick={()=>navigate('/market')}>
						<FontAwesomeIcon icon={solid("store")} size={"2xl"}/>
						<div style={mainButtonText}>Market</div>
					</Button>
					<Button variant={"outline-light"} style={mainButtonStyle} onClick={()=>navigate('/forum')}>
						<FontAwesomeIcon icon={solid("users")} size={"2xl"}/>
						<div style={mainButtonText}>Forum</div>
					</Button>
					<Button variant={"outline-light"} style={mainButtonStyle} onClick={()=>navigate('/chats')}>
						<FontAwesomeIcon icon={solid("comments-dollar")} size={"2xl"}/>
						<div style={mainButtonText}>Chats</div>
					</Button>
					<Button variant={"outline-light"} style={mainButtonStyle} onClick={()=>navigate('/profile')}>
						<FontAwesomeIcon icon={solid("user")} size={"2xl"}/>
						<div style={mainButtonText}>Dashboard</div>
					</Button>
				</div>
				
			</Container>
		</div>
	);
}

export default Home;
