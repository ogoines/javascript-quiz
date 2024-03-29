var timerEl = document.getElementById("quiz-timer");
var timeLeft = document.getElementById("time-Left");
var quizInfo = document.getElementById("quiz-directions");
const quizLength = 9;
var timerInterval;

//quiz object containing questions, answers and correct answer
const quiz = [
  {
    question: "Commonly used data types Do Not Include:",
    choice1: "string",
    choice2: "booleans",
    choice3: "alerts",
    choice4: "numbers",
    answer: 3
  },
  {
    question: "Arrays in Javascript can be used to store:",
    choice1: "numbers and strings",
    choice2: "other arrays",
    choice3: "booleans",
    choice4: "all of the above",
    answer: 4
  },
  {
    question: "How can you get the type of arguments passed to a function?",
    choice1: "using typeof operator",
    choice2: "using getType function",
    choice3: "Both of the above",
    choice4: "None of the above",
    answer: 1
  },
  {
    question: "Inside which HTML element do we put the Javascript?",
    choice1: "<javascript>",
    choice2: "<script>",
    choice3: "<scripting>",
    choice4: "<js>",
    answer: 2
  },

  {
    question: "Which event occurs when the user clicks on an HTML element?",
    choice1: "onclick",
    choice2: "onchange",
    choice3: "onmouseover",
    choice4: "js",
    answer: 1
  },
  
  {
    question: "A very useful tool during debugging for printer content to the debugger is:",
    choice1: "Javascript",
    choice2: "console log",
    choice3: "for loops",
    choice4: "terminal bash",
    answer: 4
  },
  {
    question: "String values must be enclosed with ______ when being assigned to variables.",
    choice1: "commas",
    choice2: "curly brackets",
    choice3: "quotes",
    choice4: "parenthesis",
    answer: 3
  },

  {
    question: "Which of the following function of String object splits a String object into an array of strings by separating the string into substrings?",
    choice1: "slice()",
    choice2: "split()",
    choice3: "replace()",
    choice4: "search()",
    answer: 2
  },
  {
    question: "Which of the following function of String object splits a String object into an array of strings by separating the string into substrings?",
    choice1: "slice()",
    choice2: "split()",
    choice3: "replace()",
    choice4: "search()",
    answer: 2
  },
  
  {
    question: "The condition in an if/else statement is enclosed with ______.",
    choice1: "parenthesis",
    choice2: "curly brackets",
    choice3: "quotes",
    choice4: "square brackets",
    answer: 1
  }
];


//links to elements in results section
var userScore = document.getElementById("user-score");
var initialInput = document.getElementById("initial-input");
var userInitials = document.getElementById("user-initials-btn");
var highscoreList = document.getElementById("highscore-list");
var clearScoresBtn = document.getElementById("btn-clear-scores");
let resultsContainer = document.getElementById("results-section");
var quizIndex = 0;
var numCorrect = 0;

//links to elements in question container
var questionContainer = document.getElementById("quiz-questions");
const question = document.getElementById("question");
//html collection converted to an array with datasets with custom properties
const choices = Array.from(document.getElementsByClassName("choice-text"));
let questionCounter = -1;
let currentQuestion = {};
//var checkAnswer = document.getElementById("check-answer");
let questionsAvailable = [...quiz];
console.log(questionsAvailable);
let receivingAnswers = true;


startQuiz = () => {
  quizInfo.style.display = "none";
  questionContainer.style.display = "block"
  questionCounter = -1;
  console.log("STart button onlcick")
  countdown();
  getQuestions();

}

document.getElementById("start-btn").addEventListener("click", startQuiz)
var timeLeft = 50;

//gets Quiz questions
getQuestions = () => {

  if (questionCounter < quizLength - 1) {
    questionCounter++;
    console.log(questionCounter);
    questionContainer.style.display = "inline-block";
    currentQuestion = questionsAvailable[quizIndex];
    question.innerText = currentQuestion.question;
    choices.forEach(choice => {
      const number = choice.dataset['number'];
      choice.innerText = currentQuestion['choice' + number];
    });
    questionsAvailable.splice(quizIndex, 1);
    receivingAnswers = true;
  } else {
    console.log("Question Counter", questionCounter);
    displayResults()
  }
}
//checks  selected answers 
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    const penalty = 10;
    if (!receivingAnswers) return;

    receivingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];
    let checkAnswer = document.getElementById("check-answer");
    checkAnswer.style.display = "inline-block";

    if (selectedAnswer == currentQuestion.answer) {
      numCorrect++;
      checkAnswer.textContent = 'Correct!';
    } else {
      checkAnswer.textContent = 'Incorrect';
      timeLeft = timeLeft - penalty;
    }
    userScore.textContent = numCorrect + timeLeft;
    getQuestions();

  });

});

const displayResults = () => {
  questionContainer.style.display = "none";
  resultsContainer.style.display = "inline-block";
  clearInterval(timeInterval);
  console.log("Display numCorrect")
  console.log(numCorrect);
}

// Timer that counts 
function countdown() {
  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = timeLeft + ' seconds remaining';
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timerEl.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timerEl.textContent = "Time's up!!!";
      // Use `clearInterval()` to stop the timer
      clearInterval(timerInterval);
    }
  }, 1000);
}

//adds users initials
userInitials.addEventListener("click", function (event) {
  event.preventDefault()
  var userScore = {
    user: initialInput.value,
    score: numCorrect 
  }

  var scoreBoard = JSON.parse(localStorage.getItem("codequiz")) || []
  scoreBoard.push(userScore)
  localStorage.setItem("codequiz", JSON.stringify(scoreBoard))

  resultsContainer.style.display = "none";
  document.getElementById("html-container").style.display = "block"
  console.log(scoreBoard)
})





