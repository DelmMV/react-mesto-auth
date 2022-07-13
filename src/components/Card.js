import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(card) {
	const currentUser = React.useContext(CurrentUserContext);
	
	const isOwn = card.owner._id === currentUser._id;
	const cardDeleteButtonClassName = (
			`card__delete-btn ${isOwn ? 'card__delete-btn_visible' : 'card__delete-btn_hidden'}`
	);
	
	const isLiked = card.likes.some(i => i._id === currentUser._id);
	const cardLikeButtonClassName = (
			`card__like-btn ${isLiked ? 'card__like-btn_active' : 'card__like-btn'}`
	);
	
	function handleClick() {
		card.onCardClick(card)
	}
	
	function handleLikeClick() {
		card.onCardLike(card);
	}
	
	function handleDeleteClick() {
		card.onCardDelete(card)
	}
	
	return (
			<li className="card" key={card._id}>
				<button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button"></button>
				<img alt={card.name} className="card__image" src={card.link} onClick={handleClick}/>
				<div className="card__description">
					<h2 className="card__title">{card.name}</h2>
					<div className="card__like-box">
						<button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
						<p className="cards__like-count">{card.likes.length}</p>
					</div>
				</div>
			</li>
	)
}

export default Card