import { questions } from './questions';

let idx = 0;
let score = 0;

const container = document.getElementById('question-container');
const nextBtn = document.getElementById('next');
const scoreDiv = document.getElementById('score');
const scoreValue = document.getElementById('score-value');

function renderQuestion(i) {
  const q = questions[i];
  if (!q) {
    container.innerHTML = '<p>No question</p>';
    nextBtn.disabled = true;
    scoreDiv.hidden = false;
    scoreValue.textContent = score;
    return;
  }
  container.innerHTML = `<h2>${q.text}</h2>` + q.choices.map((c, idx) =>
    `<label class="choice"><input type="radio" name="choice" value="${idx}"> ${c}</label>`
  ).join('');
}

nextBtn.addEventListener('click', () => {
  const sel = document.querySelector('input[name="choice"]:checked');
  if (sel) {
    const chosen = Number(sel.value);
    if (chosen === questions[idx].answerIndex) score += questions[idx].points ?? 1;
    idx++;
    if (idx >= questions.length) {
      container.innerHTML = '<p>Finished</p>';
      scoreDiv.hidden = false;
      scoreValue.textContent = score;
      nextBtn.disabled = true;
    } else {
      renderQuestion(idx);
    }
  } else {
    alert('Select an answer');
  }
});

// first render
renderQuestion(idx);
