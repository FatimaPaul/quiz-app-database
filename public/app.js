// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAx2tJwDXJd6DIBue20FngiCtxovTNU8Hk",
  authDomain: "quiz-app-database-8b6e2.firebaseapp.com",
  projectId: "quiz-app-database-8b6e2",
  storageBucket: "quiz-app-database-8b6e2.appspot.com",
  messagingSenderId: "795285222862",
  appId: "1:795285222862:web:b0da7063172d11b9bc279f",
  measurementId: "G-8F8JDKPD4Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
var db = getDatabase();

var currQues = document.getElementById('currQues');
var totalQues = document.getElementById('totalQues');
var ques = document.getElementById('q');
var parentOption = document.getElementById('parentOption');
var nextQuestion = document.getElementById('next');
var index = 0;
var score = 0;

var questions = [{
    question: "1. HTML stands for ________",
    options: ["Hyper Text Markup Language", "Higher Marking Language", "Hyper Tool Markup Language", "Hyper Tool Markup Language"],
    correctAns: "Hyper Text Markup Language"
}, 
{
    question: "2. CSS stands for ________",
    options: ["Cascading Style Sheet", "Case Style Sheet", "Cascading Style Shape", "Cascading Staple Sheet"],
    correctAns: "Cascading Style Sheet"
},
{
    question: "3. OOP stands for ________",
    options: ["Object Oriented Programming", "Object Organized Programming", "Object Oriented Processing", "Object Oriented Page"],
    correctAns: "Object Oriented Programming"
}
];

var submit = document.getElementById('submit');

function renderQues(){
    var quesIndex = questions[index];
    currQues.innerHTML = index + 1;
    totalQues.innerHTML = questions.length;
    ques.innerHTML = quesIndex.question;
    for(var i = 0; i < quesIndex.options.length; i++){
        parentOption.innerHTML += `<div class="col-md-6 col-sm-12 my-1 text-center">
        <button class="w-100 my-1" onclick = "checkAnswer('${quesIndex.correctAns}', '${quesIndex.options[i]}')">${quesIndex.options[i]}</button>
      </div>`;
    }
}
renderQues()

window.nextQues = function(){
    if(index < questions.length - 1){
        index++;
        parentOption.innerHTML = "";
        renderQues();
    }else if(index === questions.length - 1){
        submit.classList.remove("submit");
    }else {
        alert("your score is " + score)
    } 
}

window.checkAnswer = function(a, b){
    if(a == b){
        score = score + 1;
    }
    console.log(score)
    nextQues();
}

window.sub = function(){
    var reference = ref(db, "answers/");
    var keyTasks = push(reference);
    var obj = {
        score: score,
        id: keyTasks.key
    }
    set(keyTasks, obj);
}