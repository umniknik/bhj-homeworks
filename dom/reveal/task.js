const allReveals = Array.from(document.getElementsByClassName('reveal'));           //Собираем массив из блоков, которые надо сделать видимыми

//Добавления класса видимости блоку
function onVisible(el) {
    if (!el.classList.contains('reveal_active')) {
        el.classList.add('reveal_active');
    }
}

//Удаление класса видимости блоку
function offVisible(el) {
    if (el.classList.contains('reveal_active')) {
        el.classList.remove('reveal_active');
    }
}

//Проверка находится ли элемент в поле зрения или нет
function isVisible(el) {
    const { top, bottom } = el.getBoundingClientRect();                              // Получаем текущие координаты элемента

    (bottom < 0 || top > window.innerHeight) ? offVisible(el) : onVisible(el);       //Если элемент вне зоны видимости, то делаем его невидимым, иначе делаем видимым
}

//Присвоение каждому блоку события, чтобы при каждом скроле страницы начиналась проверка его влимости
allReveals.forEach(element => {
    window.addEventListener('scroll', () => isVisible(element));
});

