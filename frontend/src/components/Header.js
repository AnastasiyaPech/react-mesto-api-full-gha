import React from 'react';
import logo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header({ loggedIn, email, logOut }) {
    const location = useLocation().pathname;
    return (
        <header className="header">
            <div className="header__container">
            <a href="#"><img src={logo} className="header__logo" alt="логотип" /></a>
            <div className="header__navigation">
                {loggedIn && <p className="header__text">{email}</p>}
                {loggedIn && <Link to="/sign-in" className="header__link" onClick={logOut}>Выйти</Link>}
                {location ==="/sign-in" && <Link to="/sign-up" className="header__link">Регистрация</Link>}
                {location ==="/sign-up" && <Link to="/sign-in" className="header__link">Войти</Link>}
            </div>
            </div>
        </header>
    );
}

export default Header;