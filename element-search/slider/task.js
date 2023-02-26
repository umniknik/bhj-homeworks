const arraySliderItem = Array.from(document.getElementsByClassName('slider__item'));
const arraySliderDot = Array.from(document.getElementsByClassName('slider__dot'));
const battonPrev = Array.from(document.getElementsByClassName('slider__arrow_prev'))[0];
const battonNext = Array.from(document.getElementsByClassName('slider__arrow_next'))[0];

arraySliderDot[0].classList.add('slider__dot_active');

//Обработка кликов по кнопкам "назад" и "вперед"
function slider(nameButton) {
    for (let i = 0; i < arraySliderItem.length; i++) {
        if (arraySliderItem[i].classList.contains('slider__item_active')) {
            arraySliderItem[i].classList.remove('slider__item_active');            //Находим то активное фото, которое было до текущего клика и удаляем класс активности
            if (nameButton) {                                                      // Проверка, если в nameButton значение true, то значит нажали кнопку "вперед" 
                removeAllDotActive();
                if ((i + 1) === arraySliderItem.length) {                          //Условие непрерывности для обновления счетчика, если мы дошли до крайней картинки, то обновляем счетчик 
                    i = -1;
                    arraySliderItem[i + 1].classList.add('slider__item_active');  // Если было кликнуто "вперед", то добавляем класс активности следующей картинке
                    arraySliderDot[i + 1].classList.add('slider__dot_active');    // Если было кликнуто "вперед", то добавляем класс активности точке соответствующей следующей картинке
                } else {
                    arraySliderItem[i + 1].classList.add('slider__item_active');  // Аналогочно, но для случая, пока мы не долшли до конца списка картинок 
                    arraySliderDot[i + 1].classList.add('slider__dot_active');    //
                }
            } else {                                                              // ↓ Здесь всё аналогочно, только для кнопки "назад"
                removeAllDotActive();
                if (i === 0) {
                    i = arraySliderItem.length;
                    arraySliderItem[i - 1].classList.add('slider__item_active');
                    arraySliderDot[i - 1].classList.add('slider__dot_active');
                } else {
                    arraySliderItem[i - 1].classList.add('slider__item_active');
                    arraySliderDot[i - 1].classList.add('slider__dot_active');
                }
            }
            return;
        }
    }
}

battonPrev.onclick = (() => slider(false));
battonNext.onclick = (() => slider(true));

// Ф-ия, кот удаляет все активные точки при клике. (используется 3 раза, поэтому решил её вынести отдельно)
function removeAllDotActive() {
    arraySliderDot.forEach((element) => {
        element.classList.remove('slider__dot_active');
    })
}

// Обработка кликов по точкам
for (let i = 0; i < arraySliderDot.length; i++) {
    arraySliderDot[i].onclick = (() => {
        removeAllDotActive();                                         //Удаляем все активные точки
        arraySliderItem.forEach((element) => {
            element.classList.remove('slider__item_active');          //Удаляем класс активности у всех картинок
        });
        arraySliderDot[i].classList.add('slider__dot_active');        //Добавляем класс активности кликнутой точке
        arraySliderItem[i].classList.add('slider__item_active');      //Добавялем класс активности картинке, которая соответсвует кликнутой точке
    }
    )
}