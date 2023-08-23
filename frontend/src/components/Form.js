import React from 'react';

function Form({ title, textReg, children, buttonTitle, onSubmit }) {

    return (
        <div className="form">
            <h2 className="form__text">{title}</h2>
            <form className="form__container" name="registration__form" onSubmit={onSubmit} noValidate>
                {children}
                <button type="submit" className="form__button" onSubmit={onSubmit}>{buttonTitle}</button>
            </form>
            {textReg}
        </div>
    );
}

export default Form;