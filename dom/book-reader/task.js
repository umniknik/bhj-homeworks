"use strict"

const allButtonsOnPage = Array.from(document.querySelectorAll('.book__control a')); //Берём все кнопки их верхней панели

allButtonsOnPage.forEach(element => {                                               //Присваиваем событие при клике на каждую кнопку из верхней панели
    element.onclick = () => {

        const bookControl = element.closest('.book__control');                       //Определяем из какой группы наша кнопка (берем родительский элемент по селектору)
        const buttons = Array.from(bookControl.querySelectorAll('a'));               //Берем все кнопки из этой группы

        const classFirst = buttons[0].classList[0];                                  //Берем название первого класса, чтобы потом при активации(деактивации) кнопок просто к нему прибавлять "_active" и получать класс активности (универсальное решение для любой группы кнопок)
        const buttonAssignment = bookControl.classList[1];                           //Берем второй класс у данной группы, чтобы далее по нему различать назначение данной группы кнопок

        buttons.forEach(element => {
            element.classList.remove(`${classFirst}_active`);                       //При клике деактивируем все кнопки в данной группе
        })
        element.classList.add(`${classFirst}_active`);                              //При клике активируем кликнутую кнопку

        styleText(element, buttonAssignment);                                       //Запускаем ф-ию изменения текста согласно кликнутой кнопке, отправляем кликнутую кнопку и назначение группы кликнутой кнопки

        return false;                                                               //Запрещаем переход по ссылкам в кнопках
    }
})


//Ф-ия изменения текста согласно кликнутой кнопке
function styleText(element, buttonAssignment) {

    const classText = document.querySelector('.book__content');                    //Берём элемент с текстом
    let dataName;

    //Смотрим по назначению какой группе принадлежит кликнутая кнопка и производим соответствующее изменение с текстом 
    switch (buttonAssignment) {
        case 'book__control_font-size':
            dataName = element.dataset.size;                                         //Берем данные из data-атрибута кликнутой кнопки, чтобы затем подставить в окончание названия класса (универсальное решение для любого класса данной группы)
            classText.classList.remove('book_fs-big', 'book_fs-small');              //Удаляем все ранее установленные стили из этой группы
            classText.classList.add(`book_fs-${dataName}`);                          //Добавляем класс соответствующий кликнутой кнопке
            break;

        case 'book__control_color':
            dataName = element.dataset.textColor;
            classText.classList.remove('book_color-gray', 'book_color-whitesmoke', 'book_color-black');
            classText.classList.add(`book_color-${dataName}`);
            break;

        case 'book__control_background':
            dataName = element.dataset.bgColor;
            classText.classList.remove('book_bg-gray', 'book_bg-black', 'book_bg-white');
            classText.classList.add(`book_bg-${dataName}`);
            break;
    }
}

