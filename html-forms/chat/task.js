const chatWidget = document.querySelector('.chat-widget');                      //Берем кнопку чата

chatWidget.addEventListener('click', () => {
    chatWidget.classList.add('chat-widget_active');                             //При клике на кнопку чата, открываем чат добавляя ему класс активности
})

let timer;                                                                      // Переменная для хранения айдишника таймера, чтобы сбрасывать его при ввоже нового сообщения
const robotMessages = ['Кто туть?', 'Где ваша совесть', 'Мы ничего не будем вам продавать', 'Давай, досвидания!']  //Список сообщений от робота грубияна
const messag = document.getElementById('chat-widget__input');                   //Берём поле для ввода сообщения
const messags = document.getElementById('chat-widget__messages');               //Берем поле, в котором выводятся сообщения

messag.addEventListener('keydown', (e) => {                                     //При нажатии любой клавиши...
    if (e.code === 'Enter' && messag.value.length > 0) {                        //Проверяем, если это клавиша Enter и сообщение НЕ пустое, то...
        clearTimeout(timer);                                                    //Сбрасываем предыдущий таймер 
        const date = new Date;
        const time = `${date.getHours()}:${date.getMinutes()}`                  //Формируем времы вида "часы:минуты"

        //Добавляем в код поля для вывода сообщений код нового сообщения от пользователя
        messags.innerHTML += `
                                <div class="message message_client">
                                    <div class="message__time">${time}</div>
                                    <div class="message__text">
                                    ${messag.value}
                                    </div>
                                </div>
                            `;

        //Добавляем в код поля для вывода сообщений код случайного сообщения от робота грубияна из списка
        messags.innerHTML += `
                                <div class="message">
                                    <div class="message__time">${time}</div>
                                    <div class="message__text">
                                    ${robotMessages[Math.floor(Math.random() * robotMessages.length)]}
                                    </div>
                                </div>
                            `;
        messag.value = '';

        //Автоматическая прокрутка часа к последнему сообщению 
        const WidgetContainer = document.querySelector('.chat-widget__messages-container');
        const chatHeight = WidgetContainer.scrollHeight;
        WidgetContainer.scrollTop = chatHeight;

        //Запускаем таймер, чтобы простое 30 секунд, робот задал вопрос в чат 
        timer = setTimeout(() => {
            messags.innerHTML += `
                                <div class="message">
                                    <div class="message__time">${time}</div>
                                    <div class="message__text">
                                    Ещё будут глупые вопросы?
                                    </div>
                                </div>
                            `;
            WidgetContainer.scrollTop = chatHeight;
        }, 30000)

    }
})

