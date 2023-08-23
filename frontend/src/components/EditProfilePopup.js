import React, { useEffect, useState, useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    useEffect(() => {
        setName(currentUser.name || '');
        setDescription(currentUser.about || '');
    }, [isOpen, currentUser]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            popupName="popup popup_edit-profile"
            title="Редактировать профиль"
            buttonTitle="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit} >
            <div className="popup__input-container">
                <input type="text" required value={name} onChange={handleNameChange}
                    className="popup__input popup__input_type_firstname" name="firstname"
                    placeholder="Имя" minLength="2" maxLength="40" />
                <span className="popup__error firstname-input-error"></span>
            </div>
            <div className="popup__input-container">
                <input type="text" required value={description} onChange={handleDescriptionChange}
                    className="popup__input popup__input_type_proffesion" name="proffesion"
                    placeholder="О себе" minLength="2" maxLength="200" />
                <span className="popup__error proffesion-input-error"></span>
            </div>
        </PopupWithForm>
    );
}

export default EditProfilePopup;