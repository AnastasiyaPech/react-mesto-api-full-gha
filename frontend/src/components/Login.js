import React, { useState } from 'react';
import Form from './Form';

function Login({ loginUser }) {

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
        loginUser(
            email,
            password,
        );
    }

    return (
        <Form title="Вход" buttonTitle="Войти" onSubmit={handleSubmit}>
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

export default Login;