const question = document.querySelector(".question");
const questionNumberValue = document.querySelector(".question-num-value");
const totalQuestion = document.querySelector(".total-question");
const options = document.querySelector(".options").children;
const answerTrackerContainer = document.querySelector(".answer-tracker");
const correctAnswers = document.querySelector(".correct-answers");
const totalQuestion2 = document.querySelector(".totalQuestion2");
const percentage = document.querySelector(".percentage");

const option1 = document.querySelector(".option1");
const option2 = document.querySelector(".option2");
const option3 = document.querySelector(".option3");
const option4 = document.querySelector(".option4");
const option5 = document.querySelector(".option5");

let questionIndex;
let Index = 0;
let myArray = [];
let myArr = [];
let score = 0;

//DECLARE THE QUESTIONS, OPTIONS AND ANSWERS

const questions = [
   {
      q: 'A language that requires no knowledge of the hardware or the instruction set of the computer is called...',
      opt: ['A High Level Language', 'A Low Level Language', 'Machine Code', 'An Algorithm', 'None of the above'],
      ans: 0
   },
   {
      q: 'Resolving errors in a program is known as...',
      opt: ['Problem Solving', 'Refixing', 'Error Checking', 'Debugging', 'All of the above'],
      ans: 3
   },
   {
      q: 'What is the name of the software used to convert an assembly language program into a machine code...',
      opt: ['Interpreter', 'Assembler', 'Compiler', 'Translator', 'None of the above'],
      ans: 1
   },
   {
      q: 'Software that translates and executes a high level language program one line at a time..',
      opt: ['Interpreter', 'Assembler', 'Compiler', 'Translator', 'None of the above'],
      ans: 0
   },
   {
      q: 'What is a high-level programming language that was developed in the mid-1970s. It is now used to write applications for nearly every available platform...',
      opt: ['Scratch', 'tynker', 'C++', 'Javascript', 'None of the above'],
      ans: 2
   }

]

//DEFINE THE STRUCTURE OF THE QUESTIONS, OPTIONS AND ANSWERS
totalQuestion.innerHTML = questions.length;

function load() {
   questionNumberValue.innerHTML = Index + 1;

   question.innerHTML = questions[questionIndex].q;
   option1.innerHTML = questions[questionIndex].opt[0];
   option2.innerHTML = questions[questionIndex].opt[1];
   option3.innerHTML = questions[questionIndex].opt[2];
   option4.innerHTML = questions[questionIndex].opt[3];
   option5.innerHTML = questions[questionIndex].opt[4];

   Index++;
}

function check(element) {
   //console.log(element.id);
   if (element.id == questions[questionIndex].ans) {
      element.classList.add("correct");
      updateAnswerTracker("correct")
      score++;
      console.log("score" + score);
   } else {
      element.classList.add("wrong");
      updateAnswerTracker("wrong")
   }
   disabledOptions()
}


function disabledOptions() {
   for (let i = 0; i < options.length; i++) {
      options[i].classList.add("disabled");
      if (options[i].id == questions[questionIndex].ans) {
         options[i].classList.add("correct");
      }
   }
}

function enabledOptions() {
   for (let i = 0; i < options.length; i++) {
      options[i].classList.remove("disabled", "correct", "wrong");
   }
}


function validate() {
   if (!options[0].classList.contains("disabled")) {
      alert("PLEASE SELECT AN OPTION!!!")
   }
   else {
      enabledOptions()
      randomQuestion();
   }
}

//THIS IS TO WRITE THE LOGIC FOR THE NEXT BUTTON
function next() {
   validate();
}

//THIS IS A FUNCTION TO SHUFFLE THROUGH THE QUESTIONS AND NOT IN AN ASCENDING ORDER
function randomQuestion() {
   let randomNumber = Math.floor(Math.random() * questions.length);
   let duplicateVal = 0;
   if (Index == questions.length) {
      quizOver()
   } else {
      if (myArray.length > 0) {
         for (let i = 0; i < myArray.length; i++) {
            if (myArray[i] == randomNumber) {
               duplicateVal = 1;
               break;
            }
         }
         if (duplicateVal == 1) {
            randomQuestion();
         } else {
            questionIndex = randomNumber;
            load();
            myArr.push(questionIndex);
         }
      }
      if (myArray.length == 0) {
         questionIndex = randomNumber;
         load();
         myArr.push(questionIndex);
      }
      console.log("myArr:" + myArr);
      myArray.push(questionIndex);
      //console.log("myArray" + myArray);
   }
}

function answerTracker() {
   for (let i = 0; i < questions.length; i++) {
      const div = document.createElement("div");
      answerTrackerContainer.appendChild(div);
   }
}

function updateAnswerTracker(classNam) {
   answerTrackerContainer.children[Index - 1].classList.add(classNam);
}

function quizOver() {
   document.querySelector(".quiz-over").classList.add("show");
   correctAnswers.innerHTML = score;
   totalQuestion2.innerHTML = questions.length;
   percentage.innerHTML = (score / questions.length) * 100 + "%";
}

function tryAgain() {
   window.location.reload();
}

window.onload = function () {
   randomQuestion();
   answerTracker();
}
