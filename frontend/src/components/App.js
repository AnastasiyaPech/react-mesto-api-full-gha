import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import { register, authorize, checkToken } from '../utils/auth';
import InfoTooltip from './InfoTooltip';

function App() {

    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);   //статус пользователя залогинен или нет
    const [email, setEmail] = useState('');            // хранение email зарегистрированного пользователя
    const [isSuccessInfoTooltipStatus, setIsSuccessInfoTooltipStatus] = useState(false); // хранение состояния открытия попапа успеха или ошибки регистрации
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) {
            api.getToUserInfo()
                .then((data) => {
                    setCurrentUser(data)
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [loggedIn])

    useEffect(() => {
        if (loggedIn) {
            api.getInitialCards()
                .then((cards) => {
                    setCards(cards)
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [loggedIn])

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => {
                console.log(err);
            });
    }

    function handleCardDelete(id) {
        api.deleteItem(id)
            .then((data) => {
                setCards((state) => {
                    return state.filter((item) => item._id !== id)
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    function handleAddPlaceSubmit(data) {
        api.createItem(data)
            .then((data) => {
                setCards([data, ...cards]);
                closeAllPopups();
            })
            .catch(err => {
                console.log(err);
            })
    }

    function handleUpdateUser(data) {
        api.changeUserInfo(data)
            .then((data) => {
                setCurrentUser(data)
                closeAllPopups();

            })
            .catch(err => {
                console.log(err);
            })
    }

    function handleUpdateAvatar(data) {
        api.changeAvatarImage(data)
            .then((data) => {
                setCurrentUser(data)
                closeAllPopups();
            })
            .catch(err => {
                console.log(err);
            })
    }

    function handleRegister(email, password) {
        register(email, password)
            .then((data) => {
                setIsInfoTooltipOpen(true);
                setIsSuccessInfoTooltipStatus(true);
                navigate("/sign-in")
            })
            .catch(err => {
                setIsInfoTooltipOpen(true);
                setIsSuccessInfoTooltipStatus(false);
                console.log(err);
            })
    }

    function handleLogin(email, password) {
        authorize(email, password)
            .then((data) => {
                const token = data.token;
                localStorage.setItem("jwt", token);
                setLoggedIn(true);
                setEmail(email);
                navigate("/")
            })
            .catch(err => {
                console.log(err);
            })
    }

    //проверка токена
    useEffect(() => {
        const token = localStorage.getItem("jwt");
        handleCheckToken(token);
    }, [])

    function handleCheckToken(token) {
        if (token) {
            checkToken(token)
                .then((res) => {
                    if (res) {
                        const userEmail = res.data.email;
                        setEmail(userEmail);
                        setLoggedIn(true);
                        api.updateAuthorizationToken(token);
                        navigate("/");
                        
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    //удаление токена и редирект на авторизацию
    function signOut() {
        localStorage.removeItem("jwt");
        navigate("/sign-in");
        setLoggedIn(false);
    }

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

    const [selectedCard, setSelectedCard] = useState({});
    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsInfoTooltipOpen(false);
        setSelectedCard({});
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                <div className="content-background">
                    <div className="page">
                        <Header loggedIn={loggedIn} email={email} logOut={signOut} />
                        <Routes>
                            <Route path="/sign-up" element={<Register registerUser={handleRegister} loggedIn={loggedIn} />} />
                            <Route path="/sign-in" element={<Login loginUser={handleLogin} loggedIn={loggedIn} />} />
                            <Route path="*" element={<h1>NOT FOUND</h1>} />
                            <Route path="/" element={
                                <ProtectedRoute
                                    element={
                                        <Main
                                            cards={cards}
                                            onEditProfile={handleEditProfileClick}
                                            onAddPlace={handleAddPlaceClick}
                                            onEditAvatar={handleEditAvatarClick}
                                            onCardClick={handleCardClick}
                                            onCardLike={handleCardLike}
                                            onCardDelete={handleCardDelete}
                                        />
                                    }
                                    loggedIn={loggedIn}
                                />
                            }
                            />
                        </Routes>

                        <Footer />

                        {/* попап редактироавания профиля */}
                        <EditProfilePopup
                            isOpen={isEditProfilePopupOpen}
                            onClose={closeAllPopups}
                            onUpdateUser={handleUpdateUser} />

                        {/* попап добавления места */}
                        <AddPlacePopup
                            isOpen={isAddPlacePopupOpen}
                            onClose={closeAllPopups}
                            onAddPlace={handleAddPlaceSubmit} />

                        {/* попап смена аватара */}
                        <EditAvatarPopup
                            isOpen={isEditAvatarPopupOpen}
                            onClose={closeAllPopups}
                            onUpdateAvatar={handleUpdateAvatar} />

                        {/* попап картинка */}
                        <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>

                        {/* попап статуса регистрации */}
                        <InfoTooltip
                            isSuccessInfoTooltipStatus={isSuccessInfoTooltipStatus}
                            isOpen={isInfoTooltipOpen}
                            onClose={closeAllPopups}>
                        </InfoTooltip>

                    </div>
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
