let dropdownElement;
const dropdownValue = Array.from(document.getElementsByClassName('dropdown__value')); // Массив из всех меню, которые могут выпадать
let dropdownLlist;
let dropdownItem;

//Ф-ия закрытия любого открытого выпадающего меню
function closeActivebutton() {
    if (document.getElementsByClassName('dropdown__list_active')[0]) {
        let activeButton = document.getElementsByClassName('dropdown__list_active')[0];
        activeButton = activeButton.classList.remove('dropdown__list_active');
    }

}

dropdownValue.forEach(element => {
    element.addEventListener("click", () => {

        //Проверка. Если мы кликаем не на то выпадающее меню, которое было кликнуто ДО этого клика, то закрываем все активные меню
        if (dropdownElement !== element.closest('.dropdown')) {
            closeActivebutton();
        }

        dropdownElement = element.closest('.dropdown');                                  //Ищем то выпадающее меню, в котором находится кликнутая кнопка
        dropdownLlist = dropdownElement.getElementsByClassName('dropdown__list')[0];     // Нахожим в выпадающем меню кнопку открытия
        dropdownLlist.classList.toggle('dropdown__list_active');                         // Открываем (или заркываем, если оно открыто) выпадающее меню
        dropdownItem = Array.from(dropdownElement.getElementsByClassName('dropdown__item'));  //Составляем массив их всемх подпунктов меню, чтобы потом добавить им события
        let indexDropdownValue = dropdownValue.indexOf(element);                         // Получаем индекс кликнутого выпадающего меню, чтобы потом заменить его заголовок, на название подпункта

        //Клики под подпунктам выпадающего меню
        dropdownItem.forEach(element => {
            element.onclick = (() => {
                let buttonText = element.textContent;                    //Берём название кликнутого подпункта
                closeActivebutton();                                     //Закрываем меню
                dropdownValue[indexDropdownValue].textContent = buttonText;  //Присваиваем главной кнопке выпадающего меню название подпункта
                return false;
            })
        })
    })
})