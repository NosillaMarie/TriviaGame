//trivia questions, options and answers
var questions = [
    {
        question: "What is the largest fish in the ocean?",
        number: 1,
        choices: ["Blue Whale", "Blue Marlin", "Great White Shark", "Whale Shark"],
        correctAnswer: 3
    },

    {
        question: "What is the fastest fish in the ocean?",
        number: 2,
        choices: ["Sailfish", "Tuna", "Wahoo", "Mahi-Mahi"],
        correctAnswer: 0
    },
    {
        question: "What has the largest eyeball in the ocean?",
        number: 3,
        choices: ["Humpback Whale", "Giant Squid", "Great White Shark", "Bluefin Tuna"],
        correctAnswer: 1
    },
    {
        question: "What is the most poisonous fish?",
        number: 4,
        choices: ["Lionfish", "Stonefish", "Pufferfish", "Bluespotted Stingray"],
        correctAnswer: 2
    },
    {
        question: "Herman Melville, who wrote the book Moby Dick. What kind of whale was Moby Dick?",
        number: 5,
        choices: ["Killer Whale", "Sperm Whale", "Beluga Whale", "Great White Shark"],
        correctAnswer: 1
    },

    {
        question: "How many oceans are there in the world?",
        number: 6,
        choices: [2, 4, 5, 6],
        correctAnswer: 2
    },
    {
        question: "How many seas are there in the world?",
        number: 7,
        choices: [5, 6, 7, 8],
        correctAnswer: 2
    },
    {
        question: "What are the groups fish travel in called?",
        number: 8,
        choices: ["Flock", "Herd", "School", "Pack"],
        correctAnswer: 2
    }
];

var currentQuestion = 0;
var correctAnswers = 0;
var gameOver = false;

$(document).ready(function () {
    $(".trivia").hide();
    $("#progressBar").hide();

    $("button").click(function () {
        $(".trivia").show();
        $(".nextButton").show();
        $("button").hide();
        $("#progressBar").show();

        function progress(timeleft, timetotal, $element) {
            var progressBarWidth = timeleft * $element.width() / timetotal;
            $element.find('div').animate({
                width: progressBarWidth
            }, 500).html(timeleft);

            if (timeleft > 0) {
                setTimeout(function () {
                        progress(timeleft - 1, timetotal, $element);
                    },
                    1000);

                if (progress == 0) {
                    console.log("We'll figure this out!");
                    debugger;
                    resetTrivia();
                }
            }
        };
        progress(5, 5, $('#progressBar'));
    })


    //here is the first question
    displayFirstQuestion();

    $(this).find(".errorMessage").hide();
    //display next question on click.
    $(this).find(".nextButton").on("click", function () {


        if (!gameOver) {

            value = $("input[type=radio][name=optradio]:checked").val();
            //if next question button is selected without answer choice idsplay error
            if (value === undefined) {
                $(document).find(".errorMessage").text("Please select an answer!");

                $(document).find(".errorMessage").show();
            } else {
                $(document).find(".errorMessage").hide();
                //if choice selected == 
                if (value == questions[currentQuestion].correctAnswer) {
                console.log(value);

                    correctAnswers++;
                }
                currentQuestion++;

                if (currentQuestion < questions.length) {
                    displayFirstQuestion();
                } else {
                    displayScore();
                    //when game is over ask if play again
                    $(".nextButton").text("Play Again?");

                    gameOver = true;
                }
            }
        } else {
            gameOver = false;

            $(".nextButton").text("Next Question");

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
console.log(question);
    //    console.log(numChoices);

    $(questionClass).text(question);

    $(choiceList).find("li").remove();

    var choice;

    for (i = 0; i < numChoices; i++) {
        choice =
            questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="optradio"/>' + choice + '</li>').appendTo(choiceList);
//                console.log(question.choices[i]);
    }
}

function resetTrivia() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".trivia > .result").text("Your Score: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".trivia > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}
