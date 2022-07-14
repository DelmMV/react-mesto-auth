import React from "react";
import successIcon from "../images/success.svg";
import failIcon from "../images/fail.svg";

function InfoTooltip({isOpen, onClose, isSuccess}) {
	return (
			<article
					className={`popup popup_type_infoTooltip ${isOpen && "popup_opened"}`}
			>
				<div className="popup__container">
					<button
							type="button"
							className="popup__btn-close"
							onClick={onClose}
					></button>
					<img
							className="popup__register-image"
							alt="Вы успешно зарегистрировались!"
							src={isSuccess ? successIcon : failIcon}
					/>
					<p className="popup__register-text">
						{isSuccess
								? "Вы успешно зарегистрировались!"
								: "Что-то пошло не так! Попробуйте ещё раз."
						}
					</p>
				</div>
			</article>
	);
}

export default InfoTooltip;
