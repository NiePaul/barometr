const questions = [
  {
    question: "Jakie hasła używasz?",
    answers: [
      "Proste hasło",
      "Złożone, ale te same dla wielu kont",
      "Unikalne, silne hasło dla każdego konta"
    ],
    points: [0, 1, 2]
  },
  {
    question: "Jak często zmieniasz swoje hasła?",
    answers: [
      "Nigdy",
      "Rzadko, tylko gdy jest to wymagane",
      "Regularnie, co kilka miesięcy"
    ],
    points: [0, 1, 2]
  },
  {
    question: "Czy używasz menedżera haseł?",
    answers: [
      "Nie",
      "Używam, ale niesystematycznie",
      "Tak, zawsze"
    ],
    points: [0, 1, 2]
  }
];

let currentQuestion = 0;
let score = 0;
let answered = Array(questions.length).fill(false);

const questionContainer = document.getElementById("question-container");
const progress = document.getElementById("progress");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const submitButton = document.getElementById("submit");
const resultContainer = document.getElementById("result");

function loadQuestion() {
  questionContainer.innerHTML = "";
  const q = questions[currentQuestion];
  
  // Wyświetlenie pytania
  const questionTitle = document.createElement("h2");
  questionTitle.innerText = q.question;
  questionContainer.appendChild(questionTitle);
  
  // Utworzenie przycisków dla odpowiedzi
  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.innerText = answer;
    btn.onclick = () => {
      // Zapamiętanie zdobytych punktów dla bieżącego pytania
      if (!answered[currentQuestion]) {
        score += q.points[index];
        answered[currentQuestion] = true;
      }
      // Po wybraniu odpowiedzi automatycznie przechodzi do następnego pytania\n      // Jeśli to ostatnie pytanie, pokaż przycisk \"Zakończ\"\n      if (currentQuestion === questions.length - 1) {\n        submitButton.style.display = \"inline-block\";\n        nextButton.style.display = \"none\";\n      } else {\n        nextButton.style.display = \"inline-block\";\n      }\n      // Blokowanie przycisków odpowiedzi po wyborze\n      Array.from(questionContainer.querySelectorAll(\"button\")).forEach(b => b.disabled = true);\n    };\n    questionContainer.appendChild(btn);\n  });
  
  progress.innerText = `Pytanie ${currentQuestion + 1} z ${questions.length}`;
  
  prevButton.disabled = currentQuestion === 0;
  // Ukryj przyciski \"Dalej\" i \"Zakończ\" jeśli jeszcze nie wybrano odpowiedzi\n  if (!answered[currentQuestion]) {\n    nextButton.style.display = \"none\";\n    submitButton.style.display = \"none\";\n  } else if (currentQuestion < questions.length - 1) {\n    nextButton.style.display = \"inline-block\";\n    submitButton.style.display = \"none\";\n  }\n}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

function calculateResult() {
  let message = "";
  if (score >= 0 && score <= 13) {
    message = `<strong>Niska świadomość/praktyki prywatności (0–13 pkt)</strong><br>
               Twoja obecność w sieci jest jak otwarta księga – każdy ma wgląd we wszystkie strony. To czas, aby zacząć pracować nad zwiększeniem prywatności!`;
  } else if (score >= 14 && score <= 27) {
    message = `<strong>Umiarkowana świadomość/praktyki prywatności (14–27 pkt)</strong><br>
               Masz już pewne zabezpieczenia, ale nadal pozostawiasz ślady, które mogą ujawnić Twoją tożsamość. To jak chodzenie z zasłoną, która momentami opada – warto zainwestować w lepszą ochronę.`;
  } else if (score >= 28 && score <= 41) {
    message = `<strong>Wysoka świadomość/praktyki prywatności (28–41 pkt)</strong><br>
               Działasz świadomie i stosujesz wiele dobrych praktyk. Twoja obecność w sieci przypomina dobrze zaaranżowaną fortecę – niełatwo jest ją przebić, choć zawsze warto podnosić poprzeczkę.`;
  } else if (score >= 42 && score <= 55) {
    message = `<strong>Bardzo wysoka świadomość/praktyki prywatności (42–55 pkt)</strong><br>
               Jesteś widmem w sieci – Twoja obecność jest niemal niewidoczna, jak cień poruszający się po zakamarkach internetu. Twoje zaawansowane zabezpieczenia czynią Cię mistrzem prywatności, praktycznie nie złapanym dla ciekawskich oczu.`;
  } else {
    message = "Wystąpił błąd przy obliczaniu wyniku.";
  }
  
  resultContainer.innerHTML = `<p>Twój wynik: ${score} pkt</p>${message}`;
  // Po zakończeniu quizu ukryj przyciski nawigacji\n  document.getElementById(\"prev\").style.display = \"none\";\n  document.getElementById(\"next\").style.display = \"none\";\n  document.getElementById(\"submit\").style.display = \"none\";\n  progress.style.display = \"none\";\n}

loadQuestion();
