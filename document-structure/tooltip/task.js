const allTooltips = Array.from(document.getElementsByClassName('has-tooltip'));             //Берем все ссылки, у которых есть подсказки

//Ф-ия добавления подсказки в документ
function addTooltip(el) {
    let coords = getCoords(el);                                                             //получаем координаты элемента в документе

    const tooltip = `<div class="tooltip tooltip_active" style="position:absolute; left: ${coords.left}px; top: ${coords.bottom}px" >${el.title}</div>`; //Сохраняем в константе код подсказки, вместе с текстом подсказки и координатами
    el.insertAdjacentHTML('afterEnd', tooltip);                                             //Вставляем в код документа после кликнутой ссылки код нашей подсказки

    /*Теперь в зависимости от того, что указано в атрибуте data-position у кликнутой ссылки, будем передвигать нашу подсказку относительно кликнутой ссылки
    Сейчас мы сначала вставили, а затем передвигаем. Лучше было бы конечно сразу вставить с нужными координатами отноистельно кликнутой ссылки. Но пока
    элемент на вставлен в документ, то не удается узнать его высоту, чтобы передвигать его выше или ниже кликнутой ссылки (tooltip.offsetHeight не работает и если создать
    элемент через createElement(), то тоже не узнать высоту и ширину элемента пока не вставишь его в документ). Поэтому сначала вставляем в документ, затем узнаем его 
    высоту и ширину и затем уже передвигаем изменяя свойсва style подсказки */

    const newtooltip = document.querySelector('.tooltip_active');                           //Берем только, что созданную подсказку, чтобы потом обращаться к её св-ву "style"
    const position = el.dataset.position;                                                   //Берем значение положения из атрибута data-position у кликнутой ссылки

    //Располагаем нашу подсказку отноистельно кликнутой ссылки в соответствии с заданным положением в атрибуте data-position кликнутой ссылки
    switch (position) {
        case 'top':
            newtooltip.style.top = parseInt(newtooltip.style.top) - el.offsetHeight - newtooltip.offsetHeight + 'px';
            newtooltip.style.left = parseInt(newtooltip.style.left) + (el.offsetWidth - newtooltip.offsetWidth) / 2 + 'px';
            break;
        case 'left':
            newtooltip.style.top = parseInt(newtooltip.style.top) - (el.offsetHeight + newtooltip.offsetHeight) / 2 + 'px';
            newtooltip.style.left = parseInt(newtooltip.style.left) - newtooltip.offsetWidth + 'px';
            break;
        case 'right':
            newtooltip.style.top = parseInt(newtooltip.style.top) - (el.offsetHeight + newtooltip.offsetHeight) / 2 + 'px';
            newtooltip.style.left = parseInt(newtooltip.style.left) + el.offsetWidth + 'px';
            break;
        case 'bottom':
            newtooltip.style.left = parseInt(newtooltip.style.left) + (el.offsetWidth - newtooltip.offsetWidth) / 2 + 'px';
            break;
        default:
            newtooltip.style.left = parseInt(newtooltip.style.left) + (el.offsetWidth - newtooltip.offsetWidth) / 2 + 'px';
            break;
    }
}

// получаем координаты элемента в контексте документа
function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    return {
        top: box.top + window.pageYOffset,
        right: box.right + window.pageXOffset,
        bottom: box.bottom + window.pageYOffset,
        left: box.left + window.pageXOffset
    };
}

allTooltips.forEach(element => {
    element.addEventListener('click', (event) => {                                 //Присваиваем событие, если по ссылку клинули, то ....
        event.preventDefault();                                                    //Запрещаем переход по ссылке

        //Проверяем была ли до этого клика открыта какая-нибудь подсказка
        const currentTooltip = document.querySelector('.tooltip');                  //Берем ранее открытую подсказку
        if (currentTooltip !== null) {                                              //Если ранее открытая подсказка существует, то...

            //Проверяем принадлежит ли ранее открытая подсказка текущей ссылке
            if (element.title === currentTooltip.textContent) {
                currentTooltip.remove();                                            //Если принадлежит, то просто закрываем её, ведь мы повторно кликнули по той же самой ссылке
            } else {                                                                //Если текущая открытая подсказка не принадлежить кликнутой сейчас ссылке, то ....
                currentTooltip.remove();                                                  //... закрываем ранее открытую подсказку
                addTooltip(element);                                                      //... и запускаем ф-ию откртия подсказки соответсвующей кликнутой ссылке
            }

        } else {                                                                     //Если ни каких подсказок до этого не было открыто, то просто.... 
            addTooltip(element);                                                            //... запускаем ф-ию открытия подсказки, соответсвующей кликнутой ссылке
        }
    })
});