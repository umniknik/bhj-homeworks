const arrayMenuLink = Array.from(document.getElementsByClassName('menu__link')); // создаем массив из элементов со ссылками
const arrayMenuSub = Array.from(document.getElementsByClassName('menu_sub')); // создаем массив всех пунктов меню, способных открываться, чтобы искать среди них открытые

arrayMenuLink.forEach((element) => {
    element.onclick = (() => {

        arrayMenuSub.forEach((elementt) => {
            if (elementt.classList.contains('menu_active') && elementt !== element.closest('.menu__item').querySelector('.menu_sub')){ // при клике на любой пункт проверяем не открыт ли уже другой пункт меню
                elementt.classList.remove('menu_active'); // если открыт и он не равен тому, на который нажали, то закрываем.
            }
        })

        if (element.closest('.menu__item').querySelector('.menu_sub')){     // Проверяем есть ли у кликнутого пункта подменю, потому что если нет, то в следующей строке перед classList будет null, что вызовет ошшибку
        element.closest('.menu__item').querySelector('.menu_sub').classList.toggle('menu_active');  // ищем ближайшего родителя у кликнутого пункта и уже в нём ищем  .menu_sub чтобы добавить или убрать menu_active
        return false;
        }
    })
})
