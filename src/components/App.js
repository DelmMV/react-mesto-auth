import React, {useEffect, useState} from "react";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";

import Header from './Header'
import Footer from './Footer'
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup"
import EditAvatarPopup from "./EditAvatarPopup"
import AddPlacePopup from "./AddPlacePopup"
import ImagePopup from "./ImagePopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/Auth";
import {api} from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function App() {
	const [isEditAvatarPopupOpen, setIsAvatarPopup] = useState(false);
	const [isEditProfilePopupOpen, setIsProfilePopup] = useState(false);
	const [isAddPlacePopupOpen, setIsPlacePopup] = useState(false);
	const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
	const [selectedCard, setIsSelectedCard] = useState({});
	
	const [currentUser, setCurrentUser] = useState({});
	const [initialCards, setCards] = useState([]);
	const [email, setEmail] = useState("");
	const [isSuccess, setIsSuccess] = useState(true);
	const [loggedIn, setLoggedIn] = useState(false);
	const history = useHistory();
	
	useEffect(() => {
		if (loggedIn) {
			api
					.getInitialUser()
					.then((userData) => {
						setCurrentUser(userData)
					})
					.catch((err) => {
						console.log(err)
					});
			api
					.getInitialCards()
					.then((cardsArray) => {
						setCards(cardsArray.slice(0, 12))
					})
					.catch((err) => {
						console.log(err)
					});
		}
	}, [loggedIn])
	
	
	function handleCardLike(card) {
		const isLiked = card.likes.some(i => i._id === currentUser._id);
		api
				.changeLikeCardStatus(card._id, !isLiked)
				.then((newCard) => {
					setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
				})
				.catch((err) => {
					console.log(err)
				});
	}
	
	function handleCardDelete(card) {
		api
				.removeCard(card._id)
				.then(() => {
					setCards((item) => item.filter((c) => c._id !== card._id));
				})
				.catch((err) => {
					console.log(err)
				});
	}
	
	function handleUpdateUser(items) {
		api
				.setUserInfo(items)
				.then((res) => {
					setCurrentUser(res);
					closeAllPopups();
				})
				.catch((err) => {
					console.log(err);
				})
	}
	
	function handleUpdateAvatar(data) {
		api
				.updateAvatar(data).then((res) => {
			setCurrentUser(res)
		})
				.catch((err) => {
					console.log(err);
				});
		closeAllPopups();
	}
	
	function handleAddPlaceSubmit(data) {
		api
				.addCard(data.name, data.link).then((res) => {
			setCards([res, ...initialCards])
		})
				.catch((err) => {
					console.log(err);
				});
		closeAllPopups();
	}
	
	function handleClickEditProfile() {
		setIsProfilePopup(true);
	}
	
	function handleClickAddPlace() {
		setIsPlacePopup(true);
	}
	
	function handleCardClick(card) {
		setIsSelectedCard(card);
	}
	
	function handleClickEditAvatar() {
		setIsAvatarPopup(true);
	}
	
	function closeAllPopups() {
		setIsProfilePopup(false);
		setIsPlacePopup(false);
		setIsAvatarPopup(false);
		setIsInfoTooltipOpen(false);
		setIsSelectedCard({});
	}
	
	function handleRegister(email, password) {
		return auth
				.register(password, email)
				.then(() => {
					setIsSuccess(true);
					setIsInfoTooltipOpen(true);
					history.push("/sign-in");
				})
				.catch((err) => {
					console.log("err:", err);
					setIsSuccess(false);
					setIsInfoTooltipOpen(true);
				});
	}
	
	function handleLogin(password, email) {
		return auth
				.authorize(password, email)
				.then((data) => {
					setEmail(email);
					localStorage.setItem("jwt", data.token);
					checkToken();
					history.push("/");
					setLoggedIn(true);
				})
				.catch((err) => {
					console.log("err:", err);
					setIsSuccess(false);
					setIsInfoTooltipOpen(true);
				});
	}
	
	function checkToken() {
		const jwt = localStorage.getItem("jwt");
		if (jwt) {
			setIsSuccess(true);
			auth
					.checkToken(jwt)
					.then((res) => {
						setEmail(res.data.email);
						setLoggedIn(true);
						history.push("/");
					})
					.catch((err) => {
						console.log("err:", err);
						setIsSuccess(false);
						setIsInfoTooltipOpen(true);
					});
		}
	}
	
	function handleSignOut() {
		localStorage.removeItem("jwt");
		setLoggedIn(false);
		history.push("/sign-in");
	}
	
	useEffect(() => {
		checkToken()
	});
	
	return (
			<CurrentUserContext.Provider value={currentUser}>
				<Header
						handleSignOut={handleSignOut}
						email={email}
						loggedIn={loggedIn}
				/>
				<Switch>
					<ProtectedRoute
							exact
							path="/"
							loggedIn={loggedIn}
							component={Main}
							cards={initialCards}
							onEditAvatar={handleClickEditAvatar}
							onEditProfile={handleClickEditProfile}
							onAddPlace={handleClickAddPlace}
							handleCardClick={handleCardClick}
							handleCardLike={handleCardLike}
							handleCardDelete={handleCardDelete}
					/>
					<Route path="/sign-up">
						<Register handleRegister={handleRegister}/>
					</Route>
					<Route path="/sign-in">
						<Login handleLogin={handleLogin}/>
					</Route>
					<Route path='*'>
						{loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
					</Route>
				</Switch>
				
				{loggedIn && <Footer/>}
				
				<InfoTooltip
						isOpen={isInfoTooltipOpen}
						onClose={closeAllPopups}
						isSuccess={isSuccess}
				/>
				
				<EditProfilePopup
						isOpen={isEditProfilePopupOpen}
						onClose={closeAllPopups}
						onUpdateUser={handleUpdateUser}
				/>
				<EditAvatarPopup
						isOpen={isEditAvatarPopupOpen}
						onClose={closeAllPopups}
						onUpdateAvatar={handleUpdateAvatar}
				/>
				<AddPlacePopup
						isOpen={isAddPlacePopupOpen}
						onClose={closeAllPopups}
						onAddPlace={handleAddPlaceSubmit}
				/>
				<ImagePopup
						card={selectedCard}
						onClose={closeAllPopups}
				/>
			</CurrentUserContext.Provider>
	);
}

export default App;
