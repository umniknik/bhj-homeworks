const textarea = document.getElementsByTagName('textarea');                         //Берём поле ввода
const button = document.getElementsByTagName('button');                             //Берём кнопку "Очистить"

let text = localStorage.getItem('text');                                            //Берём текст сохраненный в localStorage перед перезагрузкой страницы

textarea[0].value = text;                                                           //В поле ввода вставляем взятый из localStorage текст

textarea[0].addEventListener('keydown', () => {                                     //Подписываемся на событие, что при нажатии на любую клавишу клавиатуры...
    localStorage.setItem('text', textarea[0].value);                                    //... сохраняем текст из поля ввода в localStorage
})

button[0].addEventListener('click', () => {                                         //Подписываемся на событие, что при нажатии на кнопку "Очистить" ...
    textarea[0].value = '';                                                             //Очищаем поле ввода текста
    localStorage.setItem('text', textarea[0].value);                                    //... сохраняем отсутствие текста в localStorage
})