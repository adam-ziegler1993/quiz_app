
// Initiates Quiz
function startQuiz(quizType) {
    localStorage.setItem('quizType', quizType);
    window.location.href = `${quizType}/index.html`;
}

let currentQuestionIndex = 0;
let quizType = localStorage.getItem('quizType');
let userAnswers = [];

// Quiz Questions
let quizzes = {
    "health": [
        { question: "Which exercise exerts the most amount of METs?", 
        options: ["Running", "Rowing", "Lifting", "Jumping Jacks"], 
        answer: "Rowing"},

        {question: "How much water should you be drinking every day?", 
        options: ["1 Gallon", "2 Gallons", "A few water bottles", "Your bodyweight in ounces"], 
        answer: "Your bodyweight in ounces"},

        {question: "How much rest do muscles need to recover properly?", 
        options: ["48 hours", "Whenever you feel rested", "24 hours", "A week",], 
        answer: "48 hours"},
        {question: "What do electrolytes do in your body?", 
        options: ["Kill bacteria", "Grow hair", "Help enzymes breakdown food", "Help nerves transmit electricity"], 
        answer: "Help nerves transmit electricity"},
        {question: "Which food contains the most amount of protein?", 
        options: ["Banana", "Eggs", "Fish", "Lentils"], 
        answer: "Fish"}
    ],
    "wealth": [
        {question: "What dollar bill does Benjamin Franklin appear on?", 
        options: ["$1", "$5", "$10", "$100"], 
        answer: "$100"},
        {question: "If you do not repay a debt, what might a creditor place against your property (for example, your house) as collateral until you pay up?", 
        options: ["Lien", "Debt", "For Sale Sign", "Bad Credit"], 
        answer: "Lien"},
        {question: "An asset that you pledge as security for a loan is known as ______.", 
        options: ["Collateral", "Colgate", "Crap", "Compost"], 
        answer: "Collateral"},
        {question: "What term is used to describe how the price of things go up over time?", 
        options: ["Defamation", "Inhalation", "Deflation", "Inflation"], 
        answer: "Inflation"},
        {question: "An important ratio that helps home buyers determine how much house they can afford, DTI stands for what, in real-estate parlance?", 
        options: ["Don't Trust Interns ", "Death Tax Inheritance", "Debt to Income", "Dancing Tacos Institute"], 
        answer: "Debt to Income"}    
    ],
    "programming": [
        {question: "What does CSS stand for?", 
        options: ["Crazy Stylesheets Society", "Completely Sassy Styles", "Can't Stop Spinning", "Cascading Style Sheets"], 
        answer: "Cascading Style Sheets"},
        {question: "What is JavaScript mainly used for?", 
        options: ["Enhancing user experience and interactivity", "Providing endless opportunities for bugs", "Keeping developers awake at night", "Making websites scream and shout"], 
        answer: "Enhancing user experience and interactivity"},
        {question: "What does HTML stand for?", 
        options: ["Help! This Markup's Lost", "How To Make Lasagna", "Hyperactive Text Markup Language", "Hypertext Markup Language"], 
        answer: "Hypertext Markup Language"},
        {question: "What is the best way to fix a broken website layout?", 
        options: ["Sacrifice a keyboard to the programming gods", "Throw the computer out the window and hope for the best", "Apply glitter generously to the screen", "Check your CSS and HTML for errors"], 
        answer: "Check your CSS and HTML for errors"},
        {question: "What is the preferred method of debugging for frontend developers?", 
        options: ["Crying softly in the corner", "Blaming the backend developers", "Asking Stack Overflow/Google for help", "Talk to your rubber ducky about it"], 
        answer: "Asking Stack Overflow/Google for help"}
    ]
}


function loadQuiz(quizType) {
    let quiz = quizzes[quizType];
    let question = quiz[currentQuestionIndex];

// Initialize timer
let timeLeft = 60;
document.getElementById('timer').textContent = timeLeft;

timer = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timer);
        nextQuestion();
    }
}, 1000);

    // Displays quiz questions
    document.getElementById('question-container').innerHTML = `
        <h1>${question.question}</h1>
        ${question.options.map((option, index) => `
            <div>
                <input type="radio" id="option${index}" name="question" value="${option}">
                <label for="option${index}">${option}</label>
            </div>
        `).join('')}
    `;
}

// Displays next question & options when an answer is selected
function nextQuestion() {
    let selectedOption = document.querySelector('input[name="question"]:checked');
    if (selectedOption) {
        userAnswers.push(selectedOption.value);
        currentQuestionIndex++;
        if (currentQuestionIndex < quizzes[quizType].length) {
            loadQuiz(quizType);
        } else {
            localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
            window.location.href = '../results.html';
        }
    } else {
        alert("Please select an option before proceeding.");
    }
}

// Calculates correct answers and displays results
function loadResults() {
    let userAnswers = JSON.parse(localStorage.getItem('userAnswers'));
    let quizType = localStorage.getItem('quizType');
    let quiz = quizzes[quizType];
    
    let correctAnswersCount = 0;
    for (let i = 0; i < quiz.length; i++) {
        if (userAnswers[i] === quiz[i].answer) {
            correctAnswersCount++;
        }
    }
    
    let score = (correctAnswersCount / quiz.length) * 100;
    let resultMessage = score >= 80 ? 
        `Congratulations, you needed 80% to pass and you scored ${score}%!` : 
        `Oops, better brush up on your trivia. You needed an 80% to pass and you scored ${score}%.`;

    document.getElementById('results-container').innerHTML = `
        <h1>Your Score: ${score}%</h1>
        <p>${resultMessage}</p>
    `;
}
