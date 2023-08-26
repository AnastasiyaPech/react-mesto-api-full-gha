class Api {
    constructor(baseUrl, headers) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
//метод проверяет ответ от сервера
    _checkResponse(res) {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
    }

    // получение всех карточек в виде массива
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then(this._checkResponse)
    };

    // добавление новой карточки на страницу
    createItem(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            body: JSON.stringify({
                name: data.name,
                link: data.link
            }),
            headers: this._headers
        })
            .then(this._checkResponse)
    };

    //удаление карточки
    deleteItem(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkResponse)
    };

    // загрузка информации о пользователе с сервера
    getToUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(this._checkResponse)
    };

    // редактирование профиля пользователя
    changeUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            body: JSON.stringify({
                name: data.name,
                about: data.about,
                id: data.id
            }),
            headers: this._headers
        })
            .then(this._checkResponse)
    };

    //смена аватара
    changeAvatarImage(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            body: JSON.stringify({
                avatar: data.avatar
            }),
            headers: this._headers
        })
            .then(this._checkResponse)
    };

    //постановка лайка
    putLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    //удаление лайка
    deleteLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    changeLikeCardStatus(cardId, isLiked){
      return  !isLiked ? this.putLike(cardId) : this.deleteLike(cardId);
    }

}
const api = new Api(
    'https://api.vertyfront.nomoredomainsicu.ru',
    {
        authorization: 'daaa7891-307a-4edb-9b82-7c5e6a95cac2',
        "Content-Type": 'application/json'
    });
export default api;