import React from "react";

import './styles/card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro'

/**
 * The product card component
 * @param product Product object
 * @param productImage
 * @param contactFn Contact function (set undefined to hide button)
 * @param reportFn Report function (set undefined to hide button)
 * @param removeFn Remove product function (set undefined to hide button)
 * @param editFn
 * @returns {JSX.Element}
 * @constructor
 */
function Card({product, productImage, contactFn, reportFn, removeFn, editFn}) {
	
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
			<img onClick={(e) => expandCard(product._id)} className={'card-image'}
			     src={productImage + product.picture}
			     alt={'image of ' + product.title}/>
			<div>
				{
					editFn == undefined ? (
					<button onClick={() => expandCard(product._id)} className={'card-button'}>
						<FontAwesomeIcon style={{width: '-webkit-fill-available'}} icon={solid("navicon")}/>
					</button>) : ''
				}
				{
					reportFn != undefined ? (
						<button onClick={() => reportFn(product)} className={'card-button'}>
							<FontAwesomeIcon style={{width: '-webkit-fill-available'}} icon={solid("warning")}/>
						</button>
					) : ''
				}
				{
					removeFn != undefined ? (
						<button onClick={() => removeFn(product)} className={'card-button'}>
							<FontAwesomeIcon style={{width: '-webkit-fill-available'}} icon={solid("trash-can")}/>
						</button>
					) : ''
				}
				{
					editFn != undefined ? (
						<button onClick={() => editFn(product)} className={'card-button'}>
							<FontAwesomeIcon style={{width: '-webkit-fill-available'}} icon={solid("edit")}/>
						</button>
					) : ''
				}
				<div className={'product-price'}>
					RM {product.price === 0 ? 'FREE' : product.price}
				</div>
			</div>
			<div className={'product-description'}>
				{product.description}
			</div>
			{
				contactFn != undefined ? (
					<button type="button" className="card-button-long" onClick={() => contactFn(product)}>
						Contact
					</button>
				) : ''
			}
			
		</div>
	);
}

export default Card;