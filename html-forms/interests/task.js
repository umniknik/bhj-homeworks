const labels = document.querySelectorAll('label');                                      //Берем все чекбоксы

labels.forEach(element => {
    element.addEventListener('change', () => {                                          //При изменения в каждом чекбоксе делаем следующее...

        const value = element.querySelector('input').checked;                           //Запоминаем, какое значение установлено в "кликнутый" чекбокс при данном изменении, чтобы потом такое же значение устанавливать в дочерних и родительских чекбоксах
        const interest = element.closest('.interest');                                  //Берем весь элемент с классом ".interest" в котором содержится данный чекбокс

        //Ф-ия установки значение в родительских чекбоксах
        function closestInterest(el) {
            const interestParent = el.parentElement.closest('.interest');               //Находим родительский чекбокс

            if (interestParent !== null) {                                              //Есди родительский чекбокс существует, то....

                //Берем у данного родительскиого чекбокса все дочерние чекбоксы в массив, чтобы потом проверить, все ли они имеют значение, такое же как и у кликнутого чекбокса
                const childUL = interestParent.querySelector('ul');
                const childInput = Array.from(childUL.querySelectorAll('input'));

                const Parentcheckbox = interestParent.querySelector('.interest__check'); //Берем сам чекбокс у данного родительского элемента, чтобы, чтобы потом поставить в него значение
                
                if (childInput.some((e) => e.checked !== value)) {                       //Если в дочерних чекбоксах есть хоть одно значение, которое не совпадает с кликнутым чекбоксом, то устанваливаем в него значение indeterminate
                    Parentcheckbox.indeterminate = true;
                } else {                                                                 // .... иначе устанавливаем значение кликнутого чекбокса
                    Parentcheckbox.indeterminate = false;
                    Parentcheckbox.checked = value;
                }

                closestInterest(interestParent);                                        //Снова запускаем эту ф-ию, на то случай, если у данного чекбокса есть ещё родительский чекбокс
            }
        }

        //Ф-ия установки значение в дочерних чекбоксах
        function childInterest(el) {
            
            const childUL = el.querySelector('ul');
            if (childUL !== null) {                                                     //Проверка, если список с дочерними чекбоксами существует, то...
                const childInput = Array.from(childUL.querySelectorAll('input'));       //Берем все дочерние чекбоксы, если они есть

                childInput.forEach((e) => e.checked = value);                           //Устанваливаем всем дочерним чекбоксам значание кликнутого чекбокса
            }

        }

        childInterest(interest);                                                        //Запускаем ф-ию установки значения в дочерних чекбоксах
        closestInterest(interest);                                                      //Запускаем ф-ию установки значения в родительских чекбоксах

    })
});