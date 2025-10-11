import { questions } from './questions';

let idx = 0;
let score = 0;
let timer;
let timePerQuestion = 15;

const container = document.getElementById('question-container');
const nextBtn = document.getElementById('next');
const scoreDiv = document.getElementById('score');
const scoreValue = document.getElementById('score-value');
const progressBar = document.getElementById('progress-bar');
const timeLeft = document.getElementById('time-left');

function updateProgressBar() {
  const progress = ((idx) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function startTimer() {
  let time = timePerQuestion;
  timeLeft.textContent = time;
  clearInterval(timer);

  timer = setInterval(() => {
    time--;
    timeLeft.textContent = time;

    if (time <= 0) {
      clearInterval(timer);
      handleTimeout();
    }
  }, 1000);
}

function handleTimeout() {
  const feedback = document.getElementById('feedback');
  feedback.textContent = "⏰ Time's up!";
  feedback.style.color = "orange";
  nextBtn.disabled = true;

  setTimeout(() => {
    idx++;
    if (idx >= questions.length) {
      endQuiz();
    } else {
      renderQuestion(idx);
      nextBtn.disabled = false;
    }
  }, 1500);
}

function renderQuestion(i) {
  const q = questions[i];
  if (!q) {
    endQuiz();
    return;
  }

  container.innerHTML = `
    <h2>${q.text}</h2>
    ${q.choices.map((c, idx) =>
      `<label class="choice"><input type="radio" name="choice" value="${idx}"> ${c}</label>`
    ).join('')}
    <div id="feedback" style="margin-top:10px; color:#444;"></div>
  `;

  updateProgressBar();
  startTimer();
}

function endQuiz() {
  container.innerHTML = '<p>Finished</p>';
  scoreDiv.hidden = false;
  scoreValue.textContent = score;
  nextBtn.disabled = true;
  progressBar.style.width = '100%';
  clearInterval(timer);
}

nextBtn.addEventListener('click', () => {
  const sel = document.querySelector('input[name="choice"]:checked');
  const feedback = document.getElementById('feedback');

  if (sel) {
    const chosen = Number(sel.value);
    if (chosen === questions[idx].answerIndex) {
      score += questions[idx].points ?? 1;
      feedback.textContent = "✅ Correct! " + questions[idx].explanation;
      feedback.style.color = "green";
    } else {
      feedback.textContent = "❌ Incorrect. " + questions[idx].explanation;
      feedback.style.color = "red";
    }

    clearInterval(timer);
    nextBtn.disabled = true;

    setTimeout(() => {
      idx++;
      if (idx >= questions.length) {
        endQuiz();
      } else {
        renderQuestion(idx);
        nextBtn.disabled = false;
      }
    }, 2000);
  } else {
    alert('Select an answer');
  }
});

// first render
renderQuestion(idx);
updateProgressBar();
startTimer();
