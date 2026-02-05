// Pla{const pyqs = [
    { 
        year: 2021, 
        subject: 'Ophthalmology', 
        question: 'A child came in due to complaints of diminished vision in dim light along with dry eyes and rough corneal surface. Which deficiency is associated?', 
        answer: 'D', 
        explanation: 'The symptoms described (night blindness and xerophthalmia) are classic signs of Vitamin A (Retinoic acid) deficiency.' 
    },
    { 
        year: 2021, 
        subject: 'Ophthalmology', 
        question: 'A boy came with thin built, lens subluxation and long fingers, shows deficiency of cystathione synthase. Which AA should be supplemented?', 
        answer: 'D', 
        explanation: 'In homocystinuria (cystathionine beta-synthase deficiency), Cysteine becomes an essential amino acid and must be supplemented.' 
    },
    { 
        year: 2021, 
        subject: 'Ophthalmology', 
        question: 'Acute red eye in a young male with morning stiffness. X-ray spine shows bamboo spine appearance. What is the diagnosis?', 
        answer: 'A', 
        explanation: 'The combination of acute anterior uveitis (red eye) and morning stiffness/spine changes is characteristic of Ankylosing spondylitis.' 
    },
    { 
        year: 2021, 
        subject: 'Ophthalmology', 
        question: 'A 15 year old girl non compliant for myopic glasses, what can be prescribed?', 
        answer: 'D', 
        explanation: 'For a non-compliant patient where LASIK is contraindicated (usually until age 18-21), spherical alternative correction or contact lenses are considered.' 
    },
    { 
        year: 2021, 
        subject: 'Ophthalmology', 
        question: 'A 33 yr female with complaints of diminishing vision on right halves of both eyes. Probable diagnosis?', 
        answer: 'A', 
        explanation: 'Right homonymous hemianopia (loss of right halves of vision in both eyes) is caused by a lesion in the Left optic tract.' 
    },
    { 
        year: 2021, 
        subject: 'Ophthalmology', 
        question: 'Corneal transparency is decided by which Glycosaminoglycan?', 
        answer: 'C', 
        explanation: 'Keratan sulphate is the primary GAG found in the cornea and is essential for maintaining transparency.' 
    },
    { 
        year: 2021, 
        subject: 'Ophthalmology', 
        question: 'A child with whitish pupillary reflex (leukocoria) has undergone enucleation & shows Flexner-Wintersteiner rosettes. Diagnosis is?', 
        answer: 'A', 
        explanation: 'Flexner-Wintersteiner rosettes are pathognomonic for Retinoblastoma.' 
    },
    { 
        year: 2021, 
        subject: 'Ophthalmology', 
        question: 'A one month baby comes with watering & megalocornea. Diagnosis is?', 
        answer: 'A', 
        explanation: 'Buphthalmos (congenital glaucoma) typically presents with the triad of epiphora (watering), photophobia, and blepharospasm with an enlarged cornea.' 
    },
    { 
        year: 2021, 
        subject: 'Ophthalmology', 
        question: 'A female with H/O contact lens use presents with large "cobblestone" papillae on the upper tarsal conjunctiva. Diagnosis?', 
        answer: 'B', 
        explanation: 'Giant Papillary Conjunctivitis (GPC) is frequently associated with contact lens wear.' 
    },
    { 
        year: 2021, 
        subject: 'Ophthalmology', 
        question: 'An elderly female with gradual painless decrease of vision (DOV). Fundus image shows hard exudates in a circinate pattern. Diagnosis?', 
        answer: 'A', 
        explanation: 'Hard exudates are commonly seen in Diabetic Retinopathy (DR) as a result of chronic vascular leakage.' 
    }
];

  "exam": "",
  "year": "",
  "source": "",
  "questions": [
    {
      "id": "",
      "subject": "",
      "question": "",
      "options": {
        "A": "",
        "B": "",
        "C": "",
        "D": ""
      }
    }
  ]
}ceholder data - Replace with your actual PYQs and MCQs JSON
const pyqs = [
    { year: 2022, subject: 'Anatomy', question: 'Sample PYQ?', answer: 'A', explanation: 'Explanation here.' },
    // Add more...
];

const mcqs = [
    { subject: 'Physiology', question: 'Sample MCQ?', options: ['A', 'B', 'C', 'D'], correct: 'A', explanation: 'Explanation.' },
    // Add more...
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 60;
let quizStartTime;

// Navigation
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target.getAttribute('href').substring(1);
        document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));
        document.getElementById(target).classList.remove('hidden');
    });
});

// PYQs Section
function loadPYQs() {
    const yearSelect = document.getElementById('year-select');
    const subjectSelect = document.getElementById('subject-select');
    const pyqList = document.getElementById('pyq-list');
    
    // Populate filters
    const years = [...new Set(pyqs.map(p => p.year))];
    const subjects = [...new Set(pyqs.map(p => p.subject))];
    years.forEach(y => yearSelect.innerHTML += `<option value="${y}">${y}</option>`);
    subjects.forEach(s => subjectSelect.innerHTML += `<option value="${s}">${s}</option>`);
    
    // Filter and display
    function displayPYQs() {
        const year = yearSelect.value;
        const subject = subjectSelect.value;
        const filtered = pyqs.filter(p => (year === 'all' || p.year == year) && (subject === 'all' || p.subject === subject));
        pyqList.innerHTML = filtered.map(p => `
            <div class="pyq-item">
                <p><strong>${p.year} - ${p.subject}:</strong> ${p.question}</p>
                <p><strong>Answer:</strong> ${p.answer}</p>
                <p><strong>Explanation:</strong> ${p.explanation}</p>
            </div>
        `).join('');
    }
    
    yearSelect.addEventListener('change', displayPYQs);
    subjectSelect.addEventListener('change', displayPYQs);
    displayPYQs();
}

// MCQs Quiz
document.getElementById('start-quiz').addEventListener('click', startQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizStartTime = Date.now();
    document.getElementById('mcqs').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    loadQuestion();
    startTimer();
}

function loadQuestion() {
    if (currentQuestionIndex >= mcqs.length) {
        endQuiz();
        return;
    }
    const q = mcqs[currentQuestionIndex];
    document.getElementById('question').innerHTML = `<p>${q.question}</p>`;
    document.getElementById('options').innerHTML = q.options.map((opt, i) => `<button data-index="${i}">${opt}</button>`).join('');
    document.querySelectorAll('#options button').forEach(btn => btn.addEventListener('click', selectAnswer));
}

function selectAnswer(e) {
    const selected = e.target.dataset.index;
    const correct = mcqs[currentQuestionIndex].correct === mcqs[currentQuestionIndex].options[selected];
    if (correct) score++;
    currentQuestionIndex++;
    clearInterval(timer);
    timeLeft = 60;
    loadQuestion();
    startTimer();
}

document.getElementById('submit-answer').addEventListener('click', () => {
    // Auto-submit if no selection (for simplicity)
    currentQuestionIndex++;
    clearInterval(timer);
    timeLeft = 60;
    loadQuestion();
    startTimer();
});

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            // Auto-submit
            currentQuestionIndex++;
            timeLeft = 60;
            loadQuestion();
            startTimer();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('results').classList.remove('hidden');
    const timeTaken = Math.floor((Date.now() - quizStartTime) / 1000);
    document.getElementById('score').textContent = `Score: ${score}/${mcqs.length}`;
    document.getElementById('time-taken').textContent = `Total Time: ${timeTaken}s`;
}

document.getElementById('retry').addEventListener('click', () => {
    document.getElementById('results').classList.add('hidden');
    document.getElementById('mcqs').classList.remove('hidden');
});

// Initialize
loadPYQs();