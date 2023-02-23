"use strict";

const counterDead = document.getElementById('dead');
const counterlost = document.getElementById('lost');

function getHole(index) {
    return document.getElementById("hole" + index);
}

function clickerdead() {
    counterDead.textContent++;
    if (+counterDead.textContent === 10) {
        alert('Победа');
        location.reload();
    }
}

function clickerlost() {
    counterlost.textContent++;
    if (+counterlost.textContent === 5) {
        alert('Проигрыш');
        location.reload();
    }
}

for (let i = 1; i < 10; i++) {
    getHole(i).onclick = function () {
        if (getHole(i).classList.contains('hole_has-mole')) {
            clickerdead();
        } else {
            clickerlost();
        }
    };
}
