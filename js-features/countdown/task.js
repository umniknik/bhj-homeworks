let timeNow = document.getElementById('timer');
let timeNowIner = (timeNow.textContent);

setInterval(() => {
    if (timeNowIner !== 0) {
        timeNowIner -= 1;
        timeNow.textContent = timeNowIner;
    } else {
        alert("Вы победили в конкурсе!");
        window.location.assign('https://s00.yaplakal.com/pics/pics_preview/1/5/6/14712651.jpg');
    }
}, 1000);