const item = document.querySelector('.item');                                                  //Берём поле для вывода курсов
const img = document.getElementById('loader');                                                 //Берем картинку загрузки

item.innerHTML = localStorage.getItem('item');                                                 //В поле вывода котировок вставляем котировки сохраненные в localStorage

const rates = new XMLHttpRequest();                                                            //Создаем объект класса XMLHttpRequest

rates.addEventListener('readystatechange', () => {                                             //Подписываемся на событие изменения изменения статуса готовности
    if (rates.readyState === rates.DONE) {                                                       //Если запрос завершен и готов ответ, то ....
        img.classList.remove('loader_active');                                                      //... удаляем класс активности у изображения загрузки
        item.innerHTML = '';                                                                        //очищаем поле вывода котировок от устаревших значений, взятых из localStorage
        let ratesText = JSON.parse(rates.responseText);                                             //Достаем из формата JSON наш объект с котировками в переменную

        for (let property in ratesText.response.Valute) {                                           //Перебираем все св-ва котировок объекта. И при проходе по каждому св-ву добавляем в поле вывода котировок HTML-код каждый котировки, и в каждую вставляем соответсвующее св-ву значение названия валюты и её курс
            item.innerHTML += `<div class="item"> 
                                    <div class="item__code">
                                        ${ratesText.response.Valute[property].CharCode}
                                    </div>
                                    <div class="item__value">
                                        ${ratesText.response.Valute[property].Value}
                                    </div>
                                    <div class="item__currency">
                                        руб.
                                    </div> 
                                </div>`;
        }

        localStorage.setItem('item', item.innerHTML);                                           //Сохраняем получившийся HTML-код вывода курсов в localStorage, чтобы после перезагрузки страницы сразу вставить в поле вывода курсов
    }
})

rates.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');          //Вызываем метод open(). Настраиваем запрос на открытие соединения для получения курсов

rates.send();                                                                                   //Отправляем запрос

