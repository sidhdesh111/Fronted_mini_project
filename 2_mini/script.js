

const URL = "https://opentdb.com/api.php?amount=20&category=18";
const question_area = document.querySelector(".question h2");
const question_next = document.querySelector(".question .next");
const question_show_answer = document.querySelector(".question .show_answer");
const answer_area = document.querySelector(".answer");
const quiz_title = document.querySelector(".quiz-container .title");
let correct_answer_for_current_question;
let total_correct_answer = 0;
let currentQuestionIndex = 0;
let allQuestions = 0;
let selectedAnswerButton = null;




question_next.addEventListener('click', function (e) {
    if (selectedAnswerButton) {


        console.log("Selected answer:", selectedAnswerButton.textContent);

        currentQuestionIndex++; // Move to the next question
        if (currentQuestionIndex < allQuestions.length) {
            renderQuestion(allQuestions[currentQuestionIndex]);
        } else {

            console.log("Quiz finished!");
            question_next.style.display = "none";
            question_show_answer.style.display = "inline-block";

        }
    } else {
        alert('Please select an answer before proceeding!');
    }
});


answer_area.addEventListener('click', function (e) {
    // Check if the clicked element is an answer button
    // (assuming your buttons have the class 'btn')
    if (e.target.classList.contains('btn')) {
        // Remove 'selected' class from previously selected button, if any
        if (selectedAnswerButton) {
            selectedAnswerButton.classList.remove('selected');
        }

        // Add 'selected' class to the newly clicked button
        e.target.classList.add('selected');
        selectedAnswerButton = e.target; // Store the reference to the selected button
        show_correct_answer(selectedAnswerButton, correct_answer_for_current_question);
        // Enable the next button once an answer is selected
        question_next.disabled = false;
    }

});




async function show_correct_answer(selected_answer, correct_answer) {

    // console.log(selected_answer.textContent, correct_answer);

    if (selected_answer.textContent == correct_answer) {
        total_correct_answer++;
    }



    let all_option = answer_area.querySelectorAll(".btn");
    all_option.forEach((ele) => {
        if (ele.textContent == correct_answer) {
            ele.classList.add("correct");
        } else {
            ele.classList.add("wrong");
        }
    })


}



async function get_question() {
    try {
        let response = await fetch(URL);
        if (response.status === 429) {

            await new Promise(resolve => setTimeout(resolve, 3000));
            return get_question();
        }
        let data = await response.json();
        allQuestions = data.results;
        if (allQuestions.length > 0) {
            renderQuestion(allQuestions[currentQuestionIndex]);
        } else {
            console.log("No questions received from API.");
        }
    } catch (error) {
        console.log("Error fetching questions:", error);
    }
}



function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


function renderQuestion(questionData) {
    //  console.log(quiz_title.innerHTML,questionData.category)
    quiz_title.innerHTML = `${questionData.category} Quiz, Total Question: ${allQuestions.length}`
    answer_area.innerHTML = "";
    selectedAnswerButton = null;
    question_next.disabled = true;

    question_area.innerHTML = `No.${currentQuestionIndex + 1}. ${questionData.question}`;
    correct_answer_for_current_question = questionData.correct_answer;

    // Combine and shuffle answers
    let answers = [...questionData.incorrect_answers, questionData.correct_answer];
    answers = shuffleArray(answers);

    // Create and append answer buttons
    answers.forEach(ans => {
        let Create_ansbtn = document.createElement("button");
        Create_ansbtn.setAttribute("class", "btn"); // Keep your existing class
        Create_ansbtn.innerHTML = ans; // Use innerHTML to handle HTML entities
        answer_area.appendChild(Create_ansbtn);
    });

    // Handle end of quiz display for next/show answer buttons
    if (currentQuestionIndex + 1 === allQuestions.length) {
        question_next.style.display = "none";
        question_show_answer.style.display = "inline-block";
    } else {
        question_next.style.display = "inline-block";
        question_show_answer.style.display = "none";
    }
}

get_question();





get_result = () => {

    const question_section = document.querySelector(".question");

    const percentage = (total_correct_answer / allQuestions.length) * 100;
    quiz_title.textContent = "Your Quiz Score";
    quiz_title.style.textAlign = "center";

    question_section.innerHTML = ` <div class="submit_container">
                <div class="total_question">
                    <h2>Total: ${allQuestions.length} Question</h2>
                    <h2>Total Attempt: ${currentQuestionIndex + 1} Question</h2>
                </div>
                <div class="answer_attempt">
                    <h2 class="total_correct">Total Correct Answer: ${total_correct_answer}/${allQuestions.length}</h2>
                    <h2 class="percent">Total Percentage: ${percentage}%</h2>
                </div>
            </div>
            <div class="remark">
            ${(percentage >= 80) ? '😍' : (percentage >= 60) ? '😯' : '😟'}
            </div>`

}