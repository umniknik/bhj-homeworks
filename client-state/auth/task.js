const form = document.getElementById('signin__form');                               //Берём форму авторизации
const signinBtn = document.getElementById('signin__btn');                           //Берём кнопку "Войти"
const welcome = document.getElementById('welcome');                                 //Берём блок #welcome
const exitBtn = document.getElementById('exit__btn');                               //Берум кнопку "Выйти"
const userId = document.getElementById('user_id');                                  //Берем поле в тексте приветствия, в которое можно вписать ID пользователя
const divform = form.closest('.signin');                                            //Берем блок в котором модержится форма, и к которому можно применить класс активности. чтобы потом скрыть форму

//Ф-ия закрытия/открытия формы авторизации/приветствия
function welcomeActive() {
    divform.classList.toggle('signin_active');                                      //Закрываем/Открываем форму авторизации
    welcome.classList.toggle('welcome_active');                                     //Закрываем/Открываем приветствие
}

if (localStorage.user_id) {                                                         //Если localStorage сущемствует запись с user_id, то значит пользователь уже авторизовался на сайте 
    userId.textContent = localStorage.user_id;                                          //В приветствии добавляем Id пользователя, которое берём из localStorage
    welcomeActive();                                                                    //Показываем приветсвие (запускаем ф-ию welcomeActive)
}

signinBtn.addEventListener('click', (e) => {                                        //Подписываемся на событие клик по кнопке "Войти"
    e.preventDefault();                                                                 //Запрещаем отправку формы при клике по этой кнопке

    let formData = new FormData(form);                                                  //Создаем объект formData класса FormData в который помещаем данные введнные пользователем в форму "form"
    let xhr = new XMLHttpRequest();                                                     //Создаем объект класса "XMLHttpRequest"
    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/auth');           //Настраиваем запрос "как и куда"
    xhr.send(formData);                                                                 //Отправляем в запросе наш объект formData 

    xhr.onload = () => {                                                                //После того как ответ от серера на запрос xhr будет получен
        let answer = JSON.parse(xhr.response);                                              //Преобразуем ответ из JSON формата в обычный объект

        if (answer.success) {                                                               //Если в ответе сервера answer.success === true, т.е. пользователь зарегистрирован в система, то ...
            userId.textContent = answer.user_id;                                                //В приветствии добавляем Id пользователя, которое берём из ответа сервера
            welcomeActive();                                                                    //Закрываем авторизацию  и показываем ему приветсвие с его ID (запускаем ф-ию welcomeActive)
            localStorage.user_id = answer.user_id;                                              //Записываем в localStorage ID пользователя
        } else {                                                                            //Если answer.success === false, т.к. пользователь с введными данными не существует, то...
            alert('Неверный логин/пароль')                                                      //то выведем сообщение 'Неверный логин/пароль'
        }

        form.reset();                                                                       //Очистем поля формы от введных данных
    };
})

exitBtn.addEventListener('click', () => {                                              //Подписываемся на событие клик по кнопке "Выход"
    welcomeActive();                                                                        //Закрываем приветствие и показываем форму авторизации
    userId.textContent = '';                                                                //Очищаем ID пользователя, которое было в писано в текст приветствия
    localStorage.clear();                                                                   //Очищаем localStorage от всех записей, чтобы удалить ID пользователя
})