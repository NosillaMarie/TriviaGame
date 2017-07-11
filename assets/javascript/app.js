//trivia questions, options and answers
var questions = [
    {
        question: "What is the largest fish in the ocean?",
        img: 'http://assets.sheratondjibouti.com/lps/assets/u/466_Main_Whale_Shark_002.jpg',
        fact: "The largest whale shark ever was measured at 20 Meters / 60 Feet and weighed 32 Tons / 30,844 Kilos.",
        choices: ["Blue Whale", "Blue Marlin", "Great White Shark", "Whale Shark"],
        correctAnswer: 3
    },

    {
        question: "What is the fastest fish in the ocean?",
        img: 'http://ep.yimg.com/ay/yhst-68963402652978/sailfish-tackle-1.gif',
        fact: "The sailfish is the fastest fish in the world – able to swim at a speed of 68mph.",
        choices: ["Sailfish", "Tuna", "Wahoo", "Mahi-Mahi"],
        correctAnswer: 0
    },
    {
        question: "What has the largest eyeball in the ocean?",
        img: 'http://ocean.si.edu/sites/default/files/styles/blog_photo/public/photos/dscn7509-full_1.jpg?itok=d2hAp60A',
        fact: "Giant squid have the largest eye in the animal kingdom. At up to 10 inches in diameter.",
        choices: ["Humpback Whale", "Giant Squid", "Great White Shark", "Bluefin Tuna"],
        correctAnswer: 1
    },
    {
        question: "What is the most poisonous fish?",
        img: 'http://kids.nationalgeographic.com/content/dam/kids/photos/animals/Fish/H-P/pufferfish-closeup.adapt.945.1.jpg',
        fact: "Pufferfish (some species are also called toadfish) have been given the title ‘Most Poisonous Fish’ and have also been labeled the second most poisonous vertebrate in the world.",
        choices: ["Lionfish", "Stonefish", "Pufferfish", "Bluespotted Stingray"],
        correctAnswer: 2
    },
    {
        question: "Herman Melville, who wrote the book Moby Dick. What kind of whale was Moby Dick?",
        img: 'http://imagecache6.allposters.com/LRG/61/6139/FI5G100Z.jpg',
        fact: "The sperm whale (Physeter macrocephalus), or cachalot, is the largest of the toothed whales and the largest toothed predator.",
        choices: ["Killer Whale", "Sperm Whale", "Beluga Whale", "Great White Shark"],
        correctAnswer: 1
    },

    {
        question: "How many oceans are there in the world?",
        img: 'https://aamboceanservice.blob.core.windows.net/oceanservice-prod/facts/world-ocean.gif',
        fact: "The surface of the planet is approximately 71% water and contains (5) five oceans, including the Arctic, Atlantic, Indian, Pacific and Southern.",
        choices: [2, 4, 5, 6],
        correctAnswer: 2
    },
    {
        question: "What are the groups fish travel in called?",
        img: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Large_fish_school.png',
        fact: "In biology, any group of fish that stay together and are swimming in the same direction in a coordinated manner, are schooling.",
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
    $('.result').hide();


    $(".btn-info").click(function () {
        $(".trivia").show();
        //        $(".imgdiv").show();
        $(".nextButton").show();
        $("#startMenu").hide();
        $("#progressBar").show();

    })
    //to display current question asked, image, fact, and answer choices.
    function displayFirstQuestion() {

        var question = questions[currentQuestion].question;
        var questionClass = $(document).find(".trivia > .question");
        var choiceList = $(document).find(".trivia > .choiceList");
        var numChoices = questions[currentQuestion].choices.length;
        var imgSelect = questions[currentQuestion].img
        //    var imgVar = $('<img id="dynamic">');
        //    var fact = $('<p id="lilFact">');
        //    imgVar.attr('src', questions[currentQuestion].img);
        //    imgVar.appendTo('#imgdiv').hide();
        //    fact.text(questions[currentQuestion].fact);
        //    fact.appendTo('#imgFact').hide();
        //    console.log(imgVar);
        //    console.log(numChoices);
        console.log(question);

        $(questionClass).text(question);


        $(choiceList).find("li").remove();
        //trying again on this crazy image.
        //        for (j = 0; j < imgSelect; j++) {
        //            var setImg = 
        //            $('<img id="dynamic" src=' + j + '>').appendTo('#imgdiv').hide();
        //        }

        var choice;
        //dynamically create radio buttons.
        for (i = 0; i < numChoices; i++) {
            choice =
                questions[currentQuestion].choices[i];
            $('<li><input type="radio" value=' + i + ' name="optradio"/>' + choice + '</li>').appendTo(choiceList);
            //                console.log(question.choices[i]);
        }
    };

    function progress(timeleft, timetotal, $element) {
        var progressBarWidth = timeleft * $element.width() / timetotal;
        $element.find('div').animate({
            width: progressBarWidth
        }, 600).html(timeleft);

        if (timeleft > 0) {
            setTimeout(function () {
                    progress(timeleft - 1, timetotal, $element);
                },
                1000);
        }
        if (progressBarWidth == 0) {
            console.log("Time's Up!");
            displayScore();
            $(".question, .choiceList, #progressBar").hide();
            console.log(resetTrivia);
            gameOver = true;
            clearInterval(progress);
            $(".nextButton").text("Play Again?");
            $('.nextButton').click(function () {
                location.reload();
            });
        }
    };
    progress(20, 20, $('#progressBar'));

    //here is the first question
    displayFirstQuestion();
    $(".nextButton").text("Next Question");


    $(this).find(".errorMessage").hide();
    //display next question on click.
    $(".nextButton").on("click", function () {
        $(".nextButton").on("click", function () {

            displayFirstQuestion();
        })

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
                    gameOver = true;
                    $(".question, .choiceList").hide();
                    $("#progressBar").hide();
                    displayScore();
                    //when game is over ask if play again
                    $(".nextButton").text("Play Again?");
                    $(".nextButton").text("Play Again?");
                    $('.nextButton').click(function () {
                        location.reload();
                    });
                }
            }
        } else {
            gameOver = false;

            $(".nextButton").text("Next Question");
            resetTrivia();
            displayFirstQuestion();
            hideScore();
            $(".nextButton").text("Play Again?");
            $('.nextButton').click(function () {
                location.reload();
            });
        }
    });
});


function resetTrivia() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
};

function displayScore() {
    $(document).find(".trivia > .result").text("Your Score: " + correctAnswers + " Correct out of: " + questions.length);

    $(document).find(".trivia > .result").show();
};

function hideScore() {
    $(document).find(".result").hide();
};
