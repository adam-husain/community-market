import React from "react";

import './styles/card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

function Card({product, show, hasContact, hasReport, hasRemove}) {
	
	const expandCard = (id) => {
		const target = document.getElementById(id);
		
		target.classList.toggle('expanded')
		
		const cards = document.getElementsByClassName('card');
		let expandedCount = 0;
		for (const card of cards) {
			if (card.classList.contains('expanded')) {
				expandedCount++;
				card.classList.remove('blur');
			} else {
				card.classList.add('blur');
			}
		}
		if (expandedCount === 0) {
			for (const card of cards) {
				card.classList.remove('blur');
			}
		}
	};
	
	return (
		<div id={product._id} className={"card shadow"}>
			<div className={"card-title"}>
				{product.title}
			</div>
			<img onClick={(e) => expandCard(product._id)} className={'card-image'} src={product.image} alt={'image of ' + product.name}/>
			<div>
				<button onClick={() => expandCard(product._id)} className={'card-button'}>
					<FontAwesomeIcon style={{width: '-webkit-fill-available'}} icon={solid("navicon")}/>
				</button>
				{
					hasReport ? (
						<button onClick={() => show(product, 1)} className={'card-button'}>
							<FontAwesomeIcon style={{width: '-webkit-fill-available'}} icon={solid("warning")}/>
						</button>
					) : ''
				}
				{
					hasRemove ? (
						<button onClick={() => show(product, 1)} className={'card-button'}>
							<FontAwesomeIcon style={{width: '-webkit-fill-available'}} icon={solid("trash-can")}/>
						</button>
					) : ''
				}
				<div className={'product-price'}>
					RM {product.price}
				</div>
			</div>
			<div className={'product-description'}>
				{product.description}
			</div>
			{
				hasContact ? (
					<button type="button" className="card-button-long" onClick={() => show(product, 0)}>
						Contact
					</button>
				) : ''
			}
			
		</div>
	);
}

export default Card;