import React, {useContext, useEffect, useState} from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
	
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const currentUser = useContext(CurrentUserContext);
	
	function handleNameChange(evt) {
		setName(evt.target.value);
	}
	
	function handleDescriptionChange(evt) {
		setDescription(evt.target.value);
	}
	
	function handleSubmit(evt) {
		evt.preventDefault();
		onUpdateUser({
			name: name,
			about: description,
		});
	}
	
	useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [currentUser, isOpen]);
	
	return (
			<PopupWithForm
					name="user"
					title="Редактировать профиль"
					isOpen={isOpen}
					onClose={onClose}
					textBtn="Сохранить"
					onSubmit={handleSubmit}
			>
				<input
						className="popup__input popup__input_type_name"
						id="name-input"
						name="name"
						type="text"
						placeholder="Имя"
						minLength="2"
						maxLength="40"
						required
						value={name || ''}
						onChange={handleNameChange}
				/>
				<span className="name-input-error popup__input-error"></span>
				<input
						className="popup__input popup__input_type_description"
						id="who-input"
						name="about"
						type="text"
						placeholder="О себе"
						minLength="2"
						maxLength="200"
						required
						value={description || ''}
						onChange={handleDescriptionChange}
				/>
				<span className="who-input-error popup__input-error"></span>
			</PopupWithForm>
	)
}

export default EditProfilePopup;
