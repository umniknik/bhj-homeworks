const button = document.getElementById('send');                                       //Берём кнопку "Отправить"
const fileInput = document.getElementById('file');                                    //Берём поле ввода файла
const progress = document.getElementById('progress');                                 //Берём индикатор

button.addEventListener('click', (e) => {                                             //Подписываемся на событие клик по кнопке "Отправить"
    e.preventDefault();                                                                 //Запрещаем отправку формы через стандартную кнопку

    //Создаем объект FormData и добавляем в него выбарнный файл
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    //Создаем объект запроса и задаем ему соответствующие парамметры POST и адрес, куда отравить запрос
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');

    xhr.upload.addEventListener('progress', (event) => {                                //Подписываемся на слушатель события progress
        if (event.lengthComputable) {                                                       //Проверяем измерим ли прогресс
            progress.value = event.loaded / event.total;                                    //Изменяем значение индикаторая, для этого уже отправленный размер делим на весь размер файла
        }
    })

    xhr.send(formData);                                                                 //Отправляем запрос
})

