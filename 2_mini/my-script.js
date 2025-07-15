

const URL = "https://opentdb.com/api.php?amount=10&category=18";
const question_area = document.querySelector(".question h2");
const question_next = document.querySelector(".question .next");
const question_show_answer = document.querySelector(".question .show_answer");
const answer_area = document.querySelector(".answer");
let correct_answer;
let total_question_show = 0;
let total_num_question = 0;




question_next.addEventListener('click', function (e) {
    e.preventDefault();
    total_question_show++;
    get_question();
});









async function get_question() {
    try {
        let response = await fetch(URL);
        if (response.status === 429) {
            await new Promise(resolve => setTimeout(resolve, 3000));
            return get_question(); 
        }
        let data = await response.json();
        total_num_question = data.results.length;
        get_next_question(total_num_question, data.results, total_question_show);
    } catch (error) {
        console.log("Error:", error);
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


function get_next_question(total_question, question, Current_question_no) {
    // console.log(total_question,question);
    if (total_question > Current_question_no && Array.isArray(question) && question.length > 0) {
        console.log(question[Current_question_no]);
        let answer = (question[Current_question_no].incorrect_answers);
        answer.push(question[Current_question_no].correct_answer);
        answer = shuffleArray(answer);

        console.log(answer);
        question_area.textContent = `No.${Current_question_no + 1} ${question[Current_question_no].question}`;
        answer_area.innerHTML = "";
        answer.forEach(ans => {

            let Create_ansbtn = document.createElement("button");
            Create_ansbtn.setAttribute("class", "btn");
            Create_ansbtn.textContent = ans;
            answer_area.appendChild(Create_ansbtn);

        });




    }
    // console.log(Current_question_no, total_question);
    
    if (Current_question_no+1 == total_question) {
        question_next.style.display = "none";
        question_show_answer.style.display = "inline-block";
    }
}

get_question();