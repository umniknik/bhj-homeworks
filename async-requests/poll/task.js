const title = document.getElementById('poll__title');                                                //Берем поле для вывода заголовка
const answers = document.getElementById('poll__answers');                                            //Берём поле для вывода кнопок с ответами

const xhr = new XMLHttpRequest();                                                                    //Сохдаем объект класса XMLHttpRequest

xhr.addEventListener('readystatechange', () => {                                                     //Подписываемся на событие изменения состояния готовности запроса
    if (xhr.readyState === xhr.DONE) {                                                                  //Если запрос завершен, то ...
        let response = JSON.parse(xhr.responseText);                                                    //Переводим формат JSON в объект
        title.textContent = response.data.title;                                                        //Берем из объекта название опроса
        const arrAnswers = response.data.answers;                                                       //Берём из обэекта массив с ответами опроса

        arrAnswers.forEach(element => {                                                                 //Перебираем все ответы из массива и сразу вставляем каждый в поле вывода ответов опроса
            answers.innerHTML += `<button class="poll__answer">${element}</button>`
        });

        const buttons = Array.from(answers.getElementsByClassName('poll__answer'));                     //Берем все только что созданные кнопки ответов опроса в массив
        buttons.forEach((el, index) => {                                                                //Перебираем все кнопки из массива ...
            el.addEventListener('click', () => {                                                            //... и подписываемся на событие, что при клике на каждую
                alert('Спасибо, ваш голос засчитан!');                                                          //Выведем сообщение через alert

                //Создаем POST-запрос и отправляем на сервер в нем id опроса и ответ пользователя на этот опрос
                const xhrr = new XMLHttpRequest;
                xhrr.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
                xhrr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhrr.send(`vote=${response.id}&answer=${index}`);

                xhrr.addEventListener('readystatechange', () => {                                               //Подписываемся на событие изменения состояния готовности запроса
                    if (xhrr.readyState === xhrr.DONE) {                                                        //Если запрос завершен, то ...
                        answers.innerHTML = '';                                                                 //Очищаем поле вывода ответов опроса, ведь здесь сейчас будут выведены результаты опроса
                        let responsee = JSON.parse(xhrr.responseText);                                          //Переводим формат JSON в объект                        
                        arrVotes = responsee.stat;                                                              //Берем из объекта массив с результатами

                        let sumVotus = arrVotes.reduce((acc, e) => acc + e.votes, 0);                           //Подсчитываем сумму голосов из массива, чтобы потом испольховать в полсчете процентов

                        arrVotes.forEach(e => {                                                                 //Перебираем все результаты и выводим резульаты в поле вывода результатов (Вариант ответа: процент голосов)
                            answers.innerHTML += `${e.answer}: ${(e.votes / sumVotus * 100).toFixed(2)}%<br>`;
                        })
                    }
                })
            })
        })
    }
})

xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');                                  //Заполняем запрос необходимыми параметрами
xhr.send();                                                                                               //Отправляем запрос

