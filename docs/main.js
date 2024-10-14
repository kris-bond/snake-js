class SnakeGame {
  constructor() {
    this.px = this.py = 10;
    this.gs = this.tc = 20;
    this.ax = this.ay = 15;
    this.xv = this.yv = 0;
    this.trail = [];
    this.tail = 5;
    this.score = 0;
    this.direction = 'none';
    this.gameInterval = null;
    this.canv = document.getElementById('gc');
    this.ctx = this.canv.getContext('2d');
    this.gamestarted = false;
  }

  // Initialise game
  start() {
    this.score = 0;
    this.updateScore();
    this.gamestarted = false;
    this.hideUI();

    document.addEventListener('keydown', this.keyPush.bind(this));
    this.gameInterval = setInterval(this.gameLoop.bind(this), 1000 / 15);
  }

  stop() {
    clearInterval(this.gameInterval); // Stop the game loop
    this.saveScore(this.score);
    this.resetGame();
    this.showUI();
  }

  saveScore(score) {
    let scores = JSON.parse(localStorage.getItem('highScores')) || [];

    // Add the new score and sort by highest first
    scores.push(score);
    scores.sort((a, b) => b - a);

    // Keep only top 5 scores
    scores = scores.slice(0, 5);

    // Save the updated scores back to localStorage
    localStorage.setItem('highScores', JSON.stringify(scores));
  }

  resetGame() {
    this.px = this.py = 10;
    this.ax = this.ay = 15;
    this.xv = this.yv = 0;
    this.trail = [];
    this.tail = 5;
    this.direction = 'none';
    this.updateScore();
  }

  updateScore() {
    document.querySelector('.score').textContent = this.score;
  }

  gameLoop() {
    this.updatePosition();
    this.checkCollision();
    this.drawGame();
  }

  updatePosition() {
    this.px += this.xv;
    this.py += this.yv;

    // Wrapping around board logic
    if (this.px < 0) this.px = this.tc - 1;
    if (this.px > this.tc - 1) this.px = 0;
    if (this.py < 0) this.py = this.tc - 1;
    if (this.py > this.tc - 1) this.py = 0;
  }

  checkCollision() {
    for (let i = 0; i < this.trail.length; i++) {
      if (this.trail[i].x === this.px && this.trail[i].y === this.py) {
        this.tail = 5;
        if (this.gamestarted) {
          this.stop();
        }
      }
    }

    // Eating apple
    if (this.ax === this.px && this.ay === this.py) {
      this.tail++;
      this.score++;
      this.updateScore();
      this.ax = Math.floor(Math.random() * this.tc);
      this.ay = Math.floor(Math.random() * this.tc);
    }

    this.trail.push({ x: this.px, y: this.py });
    while (this.trail.length > this.tail) {
      this.trail.shift();
    }
  }

  drawGame() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canv.width, this.canv.height);

    // Snake
    this.ctx.fillStyle = 'lime';
    for (let i = 0; i < this.trail.length; i++) {
      this.ctx.fillRect(
        this.trail[i].x * this.gs,
        this.trail[i].y * this.gs,
        this.gs - 2,
        this.gs - 2
      );
    }

    // Apple
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(
      this.ax * this.gs,
      this.ay * this.gs,
      this.gs - 2,
      this.gs - 2
    );
  }

  keyPush(evt) {
    this.gamestarted = true;
    switch (evt.keyCode) {
      case 37:
        if (this.direction !== 'right') {
          this.xv = -1;
          this.yv = 0;
          this.direction = 'left';
        }
        break;
      case 38:
        if (this.direction !== 'down') {
          this.xv = 0;
          this.yv = -1;
          this.direction = 'up';
        }
        break;
      case 39:
        if (this.direction !== 'left') {
          this.xv = 1;
          this.yv = 0;
          this.direction = 'right';
        }
        break;
      case 40:
        if (this.direction !== 'up') {
          this.xv = 0;
          this.yv = 1;
          this.direction = 'down';
        }
        break;
    }
  }

  // UI control functions
  hideUI() {
    document.getElementById('button').style.visibility = 'hidden';
    document.getElementById('button-instructions').style.visibility = 'hidden';
    document.getElementById('button-scores').style.visibility = 'hidden';
  }

  showUI() {
    document.getElementById('button').style.visibility = 'visible';
    document.getElementById('button-instructions').style.visibility = 'visible';
    document.getElementById('button-scores').style.visibility = 'visible';
  }
}

let game = new SnakeGame();

document.getElementById('button').addEventListener('click', function () {
  game.start();
});

document
  .getElementById('button-instructions')
  .addEventListener('click', function () {
    document.getElementById('instructions').style.display = 'block';
  });

document.getElementById('button-scores').addEventListener('click', function () {
  document.getElementById('scoreboard').style.display = 'block';
  let scores = JSON.parse(localStorage.getItem('highScores')) || [];
  let scoreboardText = document.getElementById('scoreboard-text');

  // Clear existing scores
  scoreboardText.innerHTML = '<p>HIGH SCORES</p>';

  // Add each high score
  scores.forEach((score, index) => {
    scoreboardText.innerHTML += `<p>${index + 1}. ${score}</p>`;
  });

  scoreboardText.innerHTML += '<p>Click to close scoreboard</p>';
  document.getElementById('scoreboard').style.display = 'block';
});

function hideInstructions() {
  document.getElementById('instructions').style.display = 'none';
}

function hideScores() {
  document.getElementById('scoreboard').style.display = 'none';
}
