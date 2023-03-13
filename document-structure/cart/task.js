const buttonQuantity = Array.from(document.getElementsByClassName('product__quantity-control'));            //Берём все круглые кнопки "Прибавить" и "Убавить" количество
const buttonAdd = Array.from(document.getElementsByClassName('product__add'));                              //Берём все кнопки "Добавить в корзину"
const cart = document.querySelector('.cart__products');                                                     //Берем поле вывода товаров в корзине

cart.innerHTML = localStorage.getItem('cartPproducts');                                                     //В поле вывода товаров в корзине добавляем товары сохраненные в localStorage перед перезагрузкой
removeProductInCart();                                                                                      //Запускаем ф-ию добавления всем крестикам события удаления соответствующего товара из корзины 

//Код изменения количества товара в карточке перед добавлением в корзину
buttonQuantity.forEach(element => {
    element.addEventListener('click', () => {                                                               //При клике на любую кнопку "Прибавить" или "Убавить" ....
        const operator = element.textContent.trim();                                                        //Берем знак, который написан на кнопке "Прибавить" или "Убавить", чтобы потом его вставить в пример, чтобы полчилось +1 или -1
        let quantity = element.parentNode.querySelector('.product__quantity-value');                        //Берём количество, указанное в карточке, чтобы потом его изменять
        quantity.textContent = eval(`${quantity.textContent} ${operator} 1`);                               //Изменяем количество товаров в карточке. Для этого используем константу "operator", в которой хранится знак "+" или "-" и в зависимости от этого к исходному значению прибавляем (или вычитаем ) единицу

        //Не даем уменьшить количество товаров меньше единицы
        if (quantity.textContent < 1) {
            quantity.textContent = 1;
        }
    })
})

//Код добавления товара в корзину
buttonAdd.forEach(element => {
    element.addEventListener('click', () => {                                                                //При клике на любую кнопку добавить
        const productCard = element.closest('.product');                                                     //Берём карточку товара, соответствующую этой кнопке (берём ближайший родительский элемент с нужным классом)
        const productImg = productCard.querySelector('.product__image');                                     //Берём изображение этой карточки 
        const quantity = productCard.querySelector('.product__quantity-value').textContent;                  //Берём количество товара в этой карточке
        const id = productCard.dataset.id;                                                                   //Берём id товара из data-атрибута
        //let imgInCart;
        const allProductIncart = Array.from(document.querySelectorAll('.cart__product'));                    //Берём все товары УЖЕ добавленные в корзину

        if (allProductIncart.length === 0 || !allProductIncart.some(item => item.outerHTML.includes(`data-id="${id}"`))) {      //Если в корзине нет товаров или добавляемого товара товара, то...
            const product = `<div class="cart__product" data-id=${id}>
                                <img class="cart__product-image" src=${productImg.src}>
                                <div class="cart__product-count">${quantity}</div>
                                <a href="#" class="task__remove">&times;</a>
                            </div>`
            cart.insertAdjacentHTML("beforeend", product);                                                                      // ... добавляем к корзину HTML-код добавляемого товара
            removeProductInCart();                                                                          //Запускаем ф-ию добавления всем крестикам события удаления соответствующего товара из корзины 
            saveInLocalStorage();                                                                               //Сохраняем список товаров в корзине в LocalStorage
        } else {                                                                                                //Если в корзине уже есть данный товар, то ...
            allProductIncart.forEach(el => {                                                                      // ... перебираем в корзине ранее добавленные товары ...
                if (el.outerHTML.includes(`data-id="${id}"`)) {                                                     // .... и у того товара, id которого соответствует id добавляемого товара...
                    let countProductInCart = el.querySelector('.cart__product-count');                                  //...берём количество
                    countProductInCart.textContent = +countProductInCart.textContent + +quantity;                       // К количеству добавленного товара в корзину прибавляем количество заданное пользователем в карточке товара

                    movingImage(el, productImg);                                                                        //Запускаем ф-ию визуального перемещения картинки
                }
            })
            saveInLocalStorage();                                                                               //Сохраняем список товаров в корзине в LocalStorage
        }
    })
})

//ф-ия визуального перемещения картинки
function movingImage(el, productImg) {

    let imgInCart = coordinatesActual(el.querySelector('.cart__product-image'));                             //Берём координаты товара в корзине с учетом прокрутки с помощью ф-ии
    let imgInCard = coordinatesActual(productImg);                                                             //Берём координаты карточки товара с учетом прокрутки с помощью ф-ии

    //Получаем размер шага по х и y. Для этого с помощью разности координат картинки в начальной и конечной точке, получаем растояние, которое надо картинке пройти по горизонтали и вертикали и делим эти значения на количество шагов (например 10)
    const stepX = +((imgInCart.left - imgInCard.left) / 10).toFixed(2);
    const stepY = +((imgInCard.top - imgInCart.top) / 10).toFixed(2);

    let flyImg = document.createElement('img')                                                                  //Создаем новый элемент картинки, которая будет передвигаться 
    document.body.append(flyImg);                                                                               //Добавляем этот элемент в код страницы
    flyImg.src = productImg.src;                                                                                //Добавляем в элемент адрес картинки соответствующей добавляемому товару
    flyImg.classList.add('product__image');                                                                     //Добавляем элементу тот же класс, что и товара, чтобы картинка выглядела так же как и товары в карточке
    flyImg.style.position = 'absolute';                                                                         //Добавляем элементу абсолютное позиционирование

    //Устанавливаем стартовое положение элементу в том же месте, где находится добавляемый товар в карточке товара
    flyImg.style.top = imgInCard.top + "px";
    flyImg.style.left = imgInCard.left + "px";

    //Через равный промежуток времени изменяем положение карточки по оси х и у на ранее высчитанные шаги
    setInterval(() => {
        if (parseInt(flyImg.style.top) >= imgInCart.top) {                                                       // Проверка, если мы не достигли высоты карточки в корзине, то продолжаем перемещать картинку
            flyImg.style.top = parseInt(flyImg.style.top) - stepY + "px";
            flyImg.style.left = parseInt(flyImg.style.left) + stepX + "px";
        } else {
            flyImg.remove();                                                                                    //иначе, если картинка достигла товара в корзине, то удаляем наш элемент
        }
    }, 50);
}

//Ф-ия определения координат с учетом прокрутки
function coordinatesActual(elem) {
    let box = elem.getBoundingClientRect();

    return {
        top: box.top + window.pageYOffset,
        right: box.right + window.pageXOffset,
        bottom: box.bottom + window.pageYOffset,
        left: box.left + window.pageXOffset
    };
}

//Ф-ия удаления товара из корзины при нажатии на крестик в углу соответствующего товара
function removeProductInCart() {
    const allRemove = Array.from(document.getElementsByClassName('task__remove'));
    allRemove.forEach(element => {
        element.onclick = () => {
            element.parentElement.remove();
            saveInLocalStorage();                                                                               //Сохраняем список товаров в корзине в LocalStorage
        }
    })    
}

//Ф-ия сохранения списка товаров в корзине в LocalStorage
function saveInLocalStorage(){
    const cartPproducts = document.querySelector('.cart__products');
    localStorage.setItem('cartPproducts', cartPproducts.innerHTML);
}