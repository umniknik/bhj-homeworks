const taskInput = document.getElementById('task__input');                              //Берём поле ввода
const buttonAdd = document.getElementById('tasks__add');                               //Берём кнопку "Добавить"
let tasksList = document.getElementById('tasks__list');                                //Берем поле вывода сообщений
tasksList.innerHTML = localStorage.getItem('tasksList');                               //В поле вывода сообщений (в innerHTML) добавлеяем сохраненный в localStorage код

//Ф-ия сохранения списка сообщений в localStorage
function saveInLocalStorage(tasksList) {
    localStorage.clear('tasksList');
    localStorage.setItem('tasksList', tasksList.innerHTML)
}

//Ф-ия добавления события на все крестики "При нажатии на крестик - удалять соответствующие сообщение"
function remove() {
    const taskRemove = Array.from(document.querySelectorAll('.task__remove'));          //Берём все крестики (ссылки с классом "task__remove")

    taskRemove.forEach(element => {
        element.onclick = () => {                                                       //При клике на любой крестик onclick удаляет предыдущее событие на нем (если оно есть) и добавляет событие, что при следующем клике по этому крестику...
            element.parentElement.remove();                                                //Удаляем сообщение, которое соответствует этому крестику, т.е. удаляем родительский элемент, в который вложена ссылки с крестиком
            saveInLocalStorage(tasksList);                                                 //Сохраняем список сообщений в localStorage
        }
    })
}

remove();                                                                               //Так как после перезагрузки мы могли получить готовый список сообщений из localStorage, то вешаем на все крестики событие закрытия соответствующего сообщения

buttonAdd.addEventListener('click', (event) => {                                        //При клике на кнопку "Добавить"
    event.preventDefault();                                                             //Запрещаем переход по ссылке в кнопке "Добавить"

    if (taskInput.value !== '') {                                                       //Если сообщение в поле ввода не пустое, то ...
                                                                                            //...формируем HTML-код добавляемого сообщения
        const currentTask = `<div class="task">
                                <div class="task__title">
                                   ${taskInput.value}
                                 </div>
                                <a href="#" class="task__remove">&times;</a>
                             </div>`
        tasksList.insertAdjacentHTML("beforeend", currentTask);                             //Добавляем HTML-код только что созданного сообщения в поле вывода сообщений перед закрывающим тегом
        taskInput.value = '';                                                               //Очищаем поле ввода

        remove();                                                                           //Вешаем на все крестики событие закрытия соответствующего сообщения

        saveInLocalStorage(tasksList);                                                      //Сохраняем список сообщений в localStorage
    }
})


