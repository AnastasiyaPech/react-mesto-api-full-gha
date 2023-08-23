import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import Form from './Form';

function Register({ registerUser }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        registerUser(
            email,
            password,
        );
    }

    return (
        <Form title="Регистрация"
            buttonTitle="Зарегистрироваться"
            textReg={
                <div className="form__register-container">
                    <p>Уже зарегистрированы?</p>
                    <Link to="login" className="form__register-link">Войти</Link>
                </div>
            }
            onSubmit={handleSubmit}>
            
            <div className="form__input-container">
                <input type="email" required value={email} onChange={handleEmailChange}
                    className="form__input" name="userUrl"
                    placeholder="Email" minLength="2" maxLength="40" />
                <span className="popup__error"></span>
            </div>
            <div className="form__input-container">
                <input type="password" required value={password} onChange={handlePasswordChange}
                    className="form__input" name="userPassword"
                    placeholder="Пароль" minLength="2" maxLength="200" />
                <span className="popup__error"></span>
            </div>

        </Form>
    );
}

export default Register;