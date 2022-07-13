import React from "react";
import Card from './Card'
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function Main(props) {
	const currentUser = React.useContext(CurrentUserContext);
	
	return (
			<main className="content">
				<section className="profile">
					<button className="profile__avatar-edit" onClick={props.onEditAvatar}>
						<img className="profile__avatar" src={currentUser.avatar} alt={currentUser.name}/>
					</button>
					<div className="profile__info">
						<h1 className="profile__title">{currentUser.name}</h1>
						<button className="profile__btn-edit" type="button" onClick={props.onEditProfile}></button>
						<h3 className="profile__subtitle">{currentUser.about}</h3>
					</div>
					<button className="profile__btn-add" type="button" onClick={props.onAddPlace}></button>
				</section>
				<section className="cards">
					<ul className="cards__list"></ul>
				</section>
				<section className="cards">
					<ul className="cards__list">
						{
							props.cards.map((card) => (
									<Card
											{...card}
											key={card._id}
											onCardClick={props.handleCardClick}
											onCardLike={props.handleCardLike}
											onCardDelete={props.handleCardDelete}
									/>
							))
						}
					</ul>
				</section>
			</main>
	)
}

export default Main