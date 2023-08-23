import React, { useEffect, useState, useContext } from 'react';
import api from '../utils/api';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) {


    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <button type="button" className="profile__image" onClick={onEditAvatar} style={{ backgroundImage: `url(${currentUser.avatar})` }}></button>
                <div className="profile__description">
                    <div className="profile__info">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button type="button" className="profile__button" onClick={onEditProfile} ></button>
                    </div>
                    <p className="profile__text">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add" onClick={onAddPlace}> </button>
            </section>
            <section className="elements">
                <ul className="list">
                    {
                        cards.map((data) => {
                            return <Card key={data._id}
                                name={data.name}
                                link={data.link}
                                likes={data.likes}
                                id={data._id}
                                owner={data.owner}
                                onClick={onCardClick}
                                onCardLike={onCardLike}
                                onCardDelete ={onCardDelete}
                                />    
                        })
                    }
                </ul>
            </section>
        </main>
    );
}


export default Main;