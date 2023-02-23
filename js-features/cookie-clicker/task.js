let all = document.getElementsByClassName("clicker__status");
const img = document.getElementById("cookie");
let counter = document.getElementById("clicker__counter");
let counterSpeed = 0;
let now = new Date();
let flag = true;    
//all[0].innerHTML = '<span id="clicker__counter">Всего кликов: '+ counter.textContent + '</span><br><span id="clicker__counter">Скорость клика: '+ counterSpeed  + '</span>';

function clicker() {
    counter.textContent++;
    let now2 = new Date();
    counterSpeed = 1/((now2.getTime() - now.getTime())/1000);
    all[0].innerHTML = '<span id="clicker__counter">Всего кликов: '+ counter.textContent + '</span><br><span id="clicker__counter">Скорость клика: '+ counterSpeed  + '</span>';
    now = new Date();
    
    if (flag) {
        img.width *= 1.1;
        img.height *= 1.1;
    } else {
        img.width /= 1.1;
        img.height /= 1.1;
    }
    flag = !flag;
}

img.onclick = clicker;