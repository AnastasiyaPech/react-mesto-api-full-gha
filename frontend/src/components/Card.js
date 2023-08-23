import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ name, link, owner, likes, id, onClick, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext);
    const isOwner = owner._id === currentUser._id;                  
    const isLiked = likes.some(i => i._id === currentUser._id);  
    
    function handleDeleteCard() {
        onCardDelete(id);
    }

    function handleLikeCard() {
        onCardLike({likes: likes, _id: id});
    }
    
    return (
        <li className="list__description">
            <div className="list__place">
                {isOwner && <button type="button" className="list__trash-button" onClick={handleDeleteCard}></button>}
                <img className="list__image" alt={name} src={link} onClick={() => onClick({ link: link, name: name })} />
            </div>
            <div className="list__container">
                <h2 className="list__text">{name}</h2>
                <div className="list__containerLikes">
                    <button type="button" className={`list__button ${isLiked && 'list__button_active'}`} onClick={handleLikeCard}></button>
                    <p className="list__countLikes">{likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;

