const arrayTabs = Array.from(document.getElementsByClassName('tab')); // Составялем массив из всех вкладок во всех группах вкладок

arrayTabs.forEach(element => {
    element.addEventListener('click', (() => {
        currentTabs = element.closest('.tabs');  // В переменную сохраняем ту группу вкладок, в которой находится только что кликнутая вкладка

        //Закрываем любую уже открытую вкладку
        let tabActive = currentTabs.getElementsByClassName('tab_active')[0]; 
        tabActive = tabActive.classList.remove('tab_active');

        //Закрываем текст люой уже кликнутой вкладки
        let tabContentActive = currentTabs.getElementsByClassName('tab__content_active')[0];
        tabContentActive = tabContentActive.classList.remove('tab__content_active');

        element.classList.add('tab_active');                                                       //Активируем кликнутую вкладку 
        
        //Узнаем индекс кликнутой вкладки в своей группе, чтобы потом по этому индексу открыть соответствующий текст
        const currentarrayTabs = Array.from(currentTabs.getElementsByClassName('tab'))
        let indexTabActive = currentarrayTabs.indexOf(element);
        
        //Отткрываем текст кликнутой вкладки
        const arrayTabContent = Array.from(currentTabs.getElementsByClassName('tab__content')); //Сохраняем в массив тексты кликнутой группы
        let tabActiveContent = arrayTabContent[indexTabActive];                         //Находим нужный текст по индексу вкладки
        tabActiveContent = tabActiveContent.classList.add('tab__content_active');       //Активируем нужный текст
    }))

});