//trivia questions, options and answers
var questions = [
    {
        question: "What is the largest fish in the ocean?",
        number: 1,
        choices: ["Blue Whale", "Blue Marlin", "Great White Shark", "Whale Shark"],
        correctAnswer: "Whale Shark"
    },

    {
        question: "What is the fastest fish in the ocean?",
        number: 2,
        choices: ["Sailfish", "Tuna", "Wahoo", "Mahi-Mahi"],
        correctAnswer: "Sailfish"
    },
    {
        question: "What has the largest eyeball in the ocean?",
        number: 3,
        choices: ["Humpback Whale", "Giant Squid", "Great White Shark", "Bluefin Tuna"],
        correctAnswer: "Giant Squid"
    },
    {
        question: "What is the most poisonous fish?",
        number: 4,
        choices: ["Lionfish", "Stonefish", "Pufferfish", "Bluespotted Stingray"],
        correctAnswer: "Pufferfish"
    },
    {
        question: "Herman Melville, who wrote the book Moby Dick. What kind of whale was Moby Dick?",
        number: 5,
        choices: ["Killer Whale", "Sperm Whale", "Beluga Whale", "Great White Shark"],
        correctAnswer: "Sperm Whale"
    },

    {
        question: "How many oceans are there in the world?",
        number: 6,
        choices: [2, 4, 5, 6],
        correctAnswer: 5
    },
    {
        question: "How many seas are there in the world?",
        number: 7,
        choices: [5, 6, 7, 8],
        correctAnswer: 7
    },
    {
        question: "What are the groups fish travel in called?",
        number: 8,
        choices: ["Flock", "Herd", "School", "Pack"],
        correctAnswer: "School"
    }
];

var currentQuestion = 0;
var correctAnswer = 0;
var gameOver = false;

$(document).ready(function () {

    //here we will display the first question
    displayFirstQuestion();
    $(this).find(".errorMessage").hide();
    //display next question on click.
    $(this).find(".nextButton").on("click", function () {

                   var value;
        if (!gameOver) {
            
            value =
                $("input[type='radio']:checked").val();
//if next question button is selected without answer choice
            if (value == undefined) {
                $(document).find(".errorMessage").text("Please select an answer!");

                $(document).find(".errorMessage").show();
            } else {
                $(document).find(".errorMessage").hide();
//if choice selected == 
                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswer++;
                }
                currentQuestion++;

                if (currentQuestion < questions.length) {
                    displayFirstQuestion();
                } else {
                    displayScore();
                    //when game is over ask if play again
                    $(document).find(".nextButton").text("Play Again?");

                    gameOver = true;
                }
            }
        } else {
            gameOver = false;

            $(document).find(".nextButton").text("Next Question");

            resetTrivia();
            displayFirstQuestion();
            hideScore();
        }
    });
});

//to display current question asked and answer choices.
function displayFirstQuestion() {

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".trivia > .question");
    var choiceList = $(document).find(".trivia > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    //    console.log(numChoices);

    $(questionClass).text(question);

    $(choiceList).find("li").remove();

    var choice;

    for (i = 0; i < numChoices; i++) {
        choice =
            questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=" + i + " name="optradio"/>' + choice + '</li>').appendTo(choiceList);
    }
}

function resetTrivia() {
    currentQuestion = 0;
    correctAnswer = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".trivia > .result").text("Your Score: " + correctAnswer + " out of: " + questions.length);
    $(document).find(".trivia > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}
