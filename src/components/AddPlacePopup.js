import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
	
	const nameInputRef = React.useRef();
	const linkInputRef = React.useRef();
	
	React.useEffect(() => {
		if (props.isOpen) nameInputRef.current.value = '';
		if (props.isOpen) linkInputRef.current.value = '';
	}, [props.isOpen])
	
	function handleSubmit(evt) {
		evt.preventDefault();
		props.onAddPlace({
			name: nameInputRef.current.value,
			link: linkInputRef.current.value,
		});
	}
	
	return (
			<PopupWithForm
					name="place"
					title="Новое Место"
					isOpen={props.isOpen}
					onClose={props.onClose}
					onSubmit={handleSubmit}
					textBtn="Создать"
			>
				<input
						className="popup__input popup__input_type_names"
						id="names-input"
						name="names-input"
						type="text"
						placeholder="Названия"
						minLength="2"
						maxLength="30"
						required
						ref={nameInputRef}
				/>
				<span className="names-input-error popup__input-error"></span>
				<input
						className="popup__input popup__input_type_image-url"
						id="image-url"
						name="image-url"
						type="url"
						placeholder="Ссылка на картинку"
						required
						ref={linkInputRef}
				/>
				<span className="who-input-error popup__input-error"></span>
			</PopupWithForm>
	)
}

export default AddPlacePopup;