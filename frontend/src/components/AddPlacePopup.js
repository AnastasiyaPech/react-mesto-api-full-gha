import React, { useEffect, useState, useContext } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name,
            link: link,
        });
    }

    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    return (
        <PopupWithForm
            popupName="popup popup_place"
            title="Новое место"
            buttonTitle="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <div className="popup__input-container">
                <input type="text" required value={name} onChange={handleNameChange} className="popup__input popup__input_type_placename" name="place"
                    placeholder="Название" minLength="2" maxLength="30" />
                <span className="popup__error place-input-error"></span>
            </div>
            <div className="popup__input-container">
                <input type="url" required value={link} onChange={handleLinkChange} className="popup__input popup__input_type_url" name="link"
                    placeholder="Ссылка на картинку" minLength="2" />
                <span className="popup__error link-input-error"></span>
            </div>
        </PopupWithForm>
    );
}

export default AddPlacePopup;