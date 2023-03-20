const popup = document.getElementById('subscribe-modal');                                 //Берём высплывающее окно
const btn = popup.getElementsByClassName('modal__close');                                 //Берём крестик закрытия всплывающего окна

const pairs = document.cookie.split('; ');                                                //Всю строку с куками разделяем на пары кук по разделителю ; и пробел
const cookie = pairs.find(p => p.startsWith('ClosetPopup'));                              //Берем только ту пару которая содержит в себе "ClosetPopup"

if (!cookie) {                                                                            //Если пары кук с ключом "ClosetPopup" нет, значит пользователь ещё не нажимал на крестик закрытия попапа, т.е. такая пара кук ещё не создавалась, то ..
    popup.classList.add('modal_active');                                                    // ... добавляем класс активности всплывающему окну
}

btn[0].addEventListener('click', () => {                                                  //Подписываемся на событие клика по крестику закрытия всплывающего окна
    popup.classList.remove('modal_active');                                                  //Удаляем класс активности у всплываюшего окна
    document.cookie = 'ClosetPopup=ОкноЗакрывалосьПользователем';                            //Записываем в куки, что пользователь закрыл окно
})




/*Сначала я всё делал через функцию, получения значения куки по имени (которую разбирали в лекции). Но потом подумал, что значение нам не нужно
в данном примере и решил убрать лишние действия. 
Вот первоначальный вид проверки с лишними действиями

if (!getCookie('ClosetPopup')){
    popup.classList.add('modal_active');                                                    // ... добавляем класс активности всплывающему окну
}

//Ф-ия получения из кук значени по ключу
function getCookie(name){
    const pairs = document.cookie.split('; ');
    const cookie = pairs.find(p => p.startsWith(name +'='));
    if (cookie){//Проверка на существование куки с таким именем, иначе, будет ошибка, т.к. если дальше применить substring к undefined будет ошибка
        return cookie.substring(name.length + 1);
    }
}
*/