//your JS code here.

// ------------------ Persistent Answer Storage Keys ------------------
const PROGRESS_KEY = "progress";
const SCORE_KEY = "score";

// ------------------ Load Previous Answers From Session Storage ------------------
let userAnswers = JSON.parse(sessionStorage.getItem(PROGRESS_KEY)) || {};

// ------------------ UI Elements ------------------
const questionsElement = document.getElementById("questions");
const scoreElement = document.getElementById("score");
const submitButton = document.getElementById("submit");

// ------------------ Display the quiz questions and choices ------------------
function renderQuestions() {
  questionsElement.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const questionDiv = document.createElement("div");
    const questionTitle = document.createElement("h4");
    questionTitle.textContent = q.question;
    questionDiv.appendChild(questionTitle);

    q.choices.forEach(choice => {
      const label = document.createElement("label");
      const input = document.createElement("input");

      input.type = "radio";
      input.name = `question-${i}`;
      input.value = choice;

      // If saved earlier, mark as checked
      if (userAnswers[i] === choice) {
        input.checked = true;
      }

      // Save progress on selection
      input.addEventListener("change", () => {
        userAnswers[i] = input.value;
        sessionStorage.setItem(PROGRESS_KEY, JSON.stringify(userAnswers));
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(label);
    });

    questionsElement.appendChild(questionDiv);
  }
}

// ------------------ Submit Quiz and Calculate Score ------------------
submitButton.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, index) => {
    if (userAnswers[index] === q.answer) {
      score++;
    }
  });

  // Display score
  scoreElement.textContent = `Your score is ${score} out of 5.`;

  // Save final score in localStorage
  localStorage.setItem(SCORE_KEY, score);
});

// ------------------ Restore Final Score If Exist After Refresh ------------------
const savedScore = localStorage.getItem(SCORE_KEY);
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of 5.`;
}

// ------------------ Render Questions Initially ------------------
renderQuestions();
