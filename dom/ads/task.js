const allCard = Array.from(document.getElementsByClassName('card'));                 // собираем все ротаторы рекламы в один массив


allCard.forEach(element => {                                                         // для каждого ротатора из массива будем делать....

    const allRotatorCase = Array.from(element.getElementsByClassName('rotator__case'));  //соберём карточки из ротатора в массив

    let speed = allRotatorCase[0].dataset.speed;                                    //Берем скрорость первой карточки из data-атрибута

    //Ф-ия закрытия текущей карточки и открытия следующей
    function aktivNextElement(index) {
        allRotatorCase[index].classList.remove('rotator__case_active');             //Удаляем класс активности у текущей карточки
        if (index === allRotatorCase.length - 1) {                                  //Проверяем, если текущая карточка является последней, то начинаем сначала
            index = -1;
        }
        allRotatorCase[index + 1].classList.add('rotator__case_active');           //Добавляем класс активности следующей карточке
        const color = allRotatorCase[index + 1].dataset.color;                     //Берем цвет следующей карточки из data-атрибута
        allRotatorCase[index + 1].style.color = color                              //Меняем цвет текста через инлайн стиль 
        speed = allRotatorCase[index + 1].dataset.speed;                           //Берем скорость смены слайдов из data-атрибута 

    }

    //Ф-ия, которая запускает сама себя через время(скорость смены слайдов), указанное в соответствующей карточке
    function update() {
        index = allRotatorCase.indexOf(element.querySelector('.rotator__case_active'));
        aktivNextElement(index)

        setTimeout(update, speed);                                                  //Ф-ия запускает самам себя через указанное время в карточке
    }

    let index = allRotatorCase.indexOf(element.querySelector('.rotator__case_active'));      //Берём индекс в массиве активной карточки
    aktivNextElement(index)                                                                  //Запускаем ф-ию откртия новой карточки и закрытия текущей
    setTimeout(update, speed);                                                               //Запускаем бесконечную ф-ию смены карточек, через время, соответсвущее каждой карточке
});

