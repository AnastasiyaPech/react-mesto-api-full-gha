import React from 'react';
import union from '../images/union.svg';
import union2 from '../images/union2.svg';

function InfoTooltip({ isSuccessInfoTooltipStatus, isOpen, onClose }) {

    return (
        <div className={`popup popup_notification ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button type="button" className="popup__button-exit popup__button-exit_picture" onClick={onClose}></button>
                <div className="popup__success-container">
                    
                    {isSuccessInfoTooltipStatus ? <img src={union} className="popup__success-image" alt="успешная регистрация" /> :
                        <img src={union2} className="popup__success-image" alt="попробуйте еще раз" />}

                    {isSuccessInfoTooltipStatus ? <h2 className="popup__success-text">Вы успешно зарегистрировались!</h2> :
                        <h2 className="popup__success-text">Что-то пошло не так! Попробуйте ещё раз.</h2>}

                </div>
            </div>
        </div>
    );
}

export default InfoTooltip;