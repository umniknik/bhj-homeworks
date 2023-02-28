class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');

    this.reset();

    this.registerEvents();

    this.timer();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
    //debugger;
    //clearInterval(0);
    clearTimeout(this.timerId);
    this.timer();
  }

  registerEvents() {

    document.addEventListener('keydown', ((e) => {

      if (this.currentSymbol.textContent === e.key.toLowerCase()) {
        this.success();
      } else {
        this.fail()
      }
    }))

  }
  
  timer() {    
    let counLetter = Array.from(this.container.getElementsByClassName('symbol')).length;  // Получаю количество символов в слове
    document.getElementById('timerr').textContent = counLetter;                           //Изменяю таймер в текст е

    this.timerId = setInterval(() => {
      counLetter --;
      document.getElementById('timerr').textContent = counLetter; 
      if (counLetter < 0) { 
        this.lossElement.textContent = 4;
        this.fail();
      }
    },1000)

  }


  success() {
    if (this.currentSymbol.classList.contains("symbol_current")) this.currentSymbol.classList.remove("symbol_current");
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add('symbol_current');
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
  }

  setNewWord() {
    const word = this.getWord();

    this.renderWord(word);
  }

  getWord() {
    const words = [
      'bob',
      'awesome',
      'netology',
      'hello',
      'kitty',
      'rock',
      'youtube',
      'popcorn',
      'cinema',
      'love',
      'javascript'
    ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current' : ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'))

