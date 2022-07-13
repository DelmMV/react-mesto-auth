import React from "react";

function ImagePopup(props) {
	return (
			<section className={`popup popup_type_preview ${props.card.link && 'popup_opened'}`}>
				<div className="popup__preview">
					<button className="popup__btn popup__btn-close popup__btn-close_type_preview" type="button"
									onClick={props.onClose}
					></button>
					<img alt={props.card.name} className="popup__preview-image"
							 src={props.card.link}/>
					<p className="popup__preview-description">{props.card.name}</p>
				</div>
			</section>
	)
}

export default ImagePopup