const modalMain = document.getElementById('modal_main');
modalMain.classList.add('modal_active');

const arrayClose = Array.from(document.getElementsByClassName('modal__close'));
arrayClose.forEach(element =>
    element.onclick = (() => {
        document.getElementById('modal_main').classList.remove('modal_active');
        document.getElementById('modal_success').classList.remove('modal_active')
      }
    )
);

const buttonShowSsuccess = document.getElementsByClassName('show-success')[0];
buttonShowSsuccess.onclick = (() => {
    document.getElementById('modal_success').classList.add('modal_active');
    document.getElementById('modal_main').classList.remove('modal_active');
    }
);