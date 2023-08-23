import React, { useEffect, useState, useContext, useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const [avatar, setAvatar] = useState('');
    const avatarRef = useRef();
    const currentUser = useContext(CurrentUserContext); // данные о пользователе в т ч аватар

    function handleChange(e) {
        setAvatar(e.target.value);
    }

    useEffect(() => {
        setAvatar(currentUser.avatar || '');
    }, [isOpen, currentUser]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
             avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm popupName="popup popup_avatar" title="Обновить аватар" buttonTitle="Сохранить"
            isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <div className="popup__input-container">
                <input type="url" ref={avatarRef} value={avatar} onChange={handleChange} required className="popup__input popup__input_type_avatar" name="link"
                    placeholder="Ссылка на аватар" minLength="2" />
                <span className="popup__error link-input-error"></span>
            </div>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;