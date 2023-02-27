const arraySliderItem = Array.from(document.getElementsByClassName('slider__item'));
const arraySliderDot = Array.from(document.getElementsByClassName('slider__dot'));
const battonPrev = Array.from(document.getElementsByClassName('slider__arrow_prev'))[0];
const battonNext = Array.from(document.getElementsByClassName('slider__arrow_next'))[0];

//При открыти страницы делаем первую точку активной (для красоты)
arraySliderDot[0].classList.add('slider__dot_active');

//Ф-ия определения индекса текущей картинки
function numberActivImg() {
    return arraySliderItem.findIndex((element) => element.classList.contains('slider__item_active'))
}

//Ф-ия открытия новой картинки (и активации точки). Старую картинку закрывает, новую (по указ индексу) открывает
function ActivetedImg(newIndex) {
    let indexOld = numberActivImg();                                        // Вызываем ф-ию определения индекса текущей картинки
    arraySliderItem[indexOld].classList.remove('slider__item_active');      // Закрываем текущ картинку
    arraySliderDot[indexOld].classList.remove('slider__dot_active');        // Закрываем текущ точку
    arraySliderItem[newIndex].classList.add('slider__item_active');         // Открываем нужную картинку
    arraySliderDot[newIndex].classList.add('slider__dot_active');           // Подсвечиваем нужную точку
}

//Ф-ия обработки индекса нужной картинки после нажатия кнопок "вперед" и "назад". 
function processor(arg) {
    let oldIndex = numberActivImg();            // Получем индекс текущей картинки
    let newIndex;

    if (arg) {                                   // Если нажали кнопку "вперед", то ....
        if (oldIndex + 1 === arraySliderItem.length) {  //Проверяем не находится ли текущая картинка в конце массива
            newIndex = 0;                               //Если текущая картинка находится в конце массива, то начинаем просмотр картинок сначала
        } else {
            newIndex = oldIndex + 1;            //Если текущая картинка НЕ находится в конце массива, то просто берем индекс следующей картинки
        }
    } else {                                    // Если нажали кнопку "назад", то ...
        if (oldIndex - 1 < 0) {                 // ↓ аналогично ↑
            newIndex = arraySliderItem.length - 1;
        } else {
            newIndex = oldIndex - 1;
        }
    }

    ActivetedImg(newIndex);                    //Запускаем ф-ию открытия картинки с только что полученным индексом следующей картинки

}

battonNext.onclick = (() => processor(true));
battonPrev.onclick = (() => processor(false));

//Присваиваем каждой точке событие, чтобы при клике запускалась ф-ия открытия соответствующей картинки
for (let i = 0; i < arraySliderDot.length; i++) {
    arraySliderDot[i].onclick = (() => {
        ActivetedImg(i);
    }
    )
}