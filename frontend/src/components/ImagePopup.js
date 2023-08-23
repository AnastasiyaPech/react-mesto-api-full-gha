import React from 'react';

function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup_picture popup_theme_dark ${card.link && 'popup_opened'}`}>
            <div className="popup__container popup__container_picture">
                <button type="button" className="popup__button-exit popup__button-exit_picture" onClick={onClose}></button>
                <img src={card.link} className="popup__image" alt={card.name} />
                <div className="popup__text-container">
                    <h2 className="popup__picture-text">{card.name}</h2>
                </div>
            </div>
        </div>
    );
}

export default ImagePopup;