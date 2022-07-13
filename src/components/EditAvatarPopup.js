import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
	const inputRef = React.useRef();
	
	function handleSubmit(evt) {
		
		evt.preventDefault();
		props.onUpdateAvatar({avatar: inputRef.current.value,});
	}
	
	React.useEffect(() => {
		if (props.isOpen) inputRef.current.value = '';
	}, [props.isOpen]);
	
	return (
			<PopupWithForm
					name="avatar"
					title="Обновить аватар"
					isOpen={props.isOpen}
					onClose={props.onClose}
					textBtn="Сохранить"
					onSubmit={handleSubmit}
			>
				<input
						className="popup__input popup__input_type_profile"
						id="profile-input"
						name="avatar"
						type="url"
						placeholder="Ссылка на картинку"
						required
						ref={inputRef}
				/>
				<span className="names-input-error popup__input-error"></span>
			</PopupWithForm>
	)
}

export default EditAvatarPopup;