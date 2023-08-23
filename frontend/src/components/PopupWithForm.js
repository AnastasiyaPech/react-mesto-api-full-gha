import React from 'react';

function PopupWithForm({popupName, title, children, buttonTitle, isOpen, onClose, onSubmit}) {

    return (
        <div className={`popup popup_${popupName} ${isOpen && 'popup_opened'}`}>
        <div className="popup__container">
            <button type="button" className="popup__button-exit popup__button-exit_picture" onClick={onClose}></button>
            <h2 className="popup__text">{title}</h2>
            <form name="profile__form" className="popup__form popup__form_place" onSubmit={onSubmit} noValidate>
                {children}
                <button type="submit" className="popup__button-save">{buttonTitle}</button>
            </form>
        </div>
    </div>
    );
}

export default PopupWithForm;