$(document).ready(function(){
// -----------------------------------------------------------
//Global variables
// -----------------------------------------------------------
var maxTime;
var intervalId;
var windowTimeout;
var qNumber;
var currentQuestion;
var correct;
var wrong;
var clicked;
var entered_val;
var image;
var notanswered;

// -----------------------------------------------------------
// Question array objects
// -----------------------------------------------------------
var questions = [
{	
	id: 1,
	q: "What is the capital of Texas",
	option1: "Pierre",
	option2: "Austin",
	option3: "Dallas",
	option4: "Houston",
	answer: "Austin",
	imgsrc: "assets/images/texas.png",
},
{
	id: 2,
	q: "What is the capital of Ohio",
	option1: "Santa Fe",
	option2: "Columbia",
	option3: "Columbus",
	option4: "Salem",
	answer: "Columbus",
	imgsrc: "assets/images/ohio.png",
},
{
	id: 3,
	q: "What is the capital of Colorado",
	option1: "Annapolis",
	option2: "St. Paul",
	option3: "Little Rock",
	option4: "Denver",
	answer: "Denver",
	imgsrc: "assets/images/colorado.png",
},
{
	id: 4,
	q: "What is the capital of Georgia",
	option1: "Atlanta",
	option2: "Jefferson City",
	option3: "Indianapolis",
	option4: "Oklahoma City",
	answer: "Atlanta",
	imgsrc: "assets/images/georgia.png",
},
{
	id: 5,
	q: "What is the capital of Florida",
	option1: "Salt Lake City",
	option2: "Tallahassee",
	option3: "Phoenix",
	option4: "Lincoln",
	answer: "Tallahassee",
	imgsrc: "assets/images/florida.png",
},
];
// -----------------------------------------------------------
//Initialize function
// -----------------------------------------------------------
var initialize = function(){
	$("#time").html("");
	$("#questionSection").html("");
	maxTime = 30;
	qNumber = 0;
	correct = 0;
	wrong 	= 0;
	notanswered = 0;
	clicked = false;
	var startBtn = $("<button>");
	startBtn.addClass("btn");
	startBtn.attr("id", "startButton");
	startBtn.text("Start");	
	$("#start").html(startBtn);
	$("#restart").hide();
	onClick();
}
// -----------------------------------------------------------
//Displaying the remaining time and the questions with options
// -----------------------------------------------------------
var display = function() {
	if(maxTime < 0){
		maxTime =30;
		if(qNumber<questions.length){
			if(!clicked){
				notanswered++;
				clearInterval(intervalId);
				timeoutDisplay();
				windowTimeout = setTimeout(function(){
					displayQuestion();
					run();
				}, 2000);
			}
			else{
				displayQuestion();
			}
		}
		else if((qNumber==questions.length) && (!clicked)){
			notanswered++;
			clearInterval(intervalId);
			timeoutDisplay();
			windowTimeout = setTimeout(function(){
				showResult();
			}, 2000);		
		}
		else {
			showResult();
		}
	}
	$("#time").html("<h2>" + "Time Remaining: "+ maxTime + "</h2>");
	maxTime--;
}
// -----------------------------------------------------------
//display called after every second
// -----------------------------------------------------------
var run = function(){
	intervalId = setInterval(display, 1000);
}
// -----------------------------------------------------------
//Event handlers for the buttons
// -----------------------------------------------------------
var onClick = function(){
	// Start Button
	$("#startButton").on("click", function(){
		$("#startButton").hide();
		displayQuestion();
		run();
	});
	//Option1
	$("#op1").on("click", function(){
		maxTime = -1;
		clicked = true;
		clearInterval(intervalId);
		entered_val = $("#op1").text();
		if(entered_val === currentQuestion.answer){
			correct++;
			correctDisplay();
			windowTimeout = setTimeout(function(){
				run();
			}, 2000);
		}
		else{
			wrong++;
			wrongDisplay();
			windowTimeout = setTimeout(function(){
				run();
			}, 2000);
		}

	});
	//Option2
	$("#op2").on("click", function(){
		maxTime = -1;
		clicked = true;
		clearInterval(intervalId);
		entered_val = $("#op2").text();
		if(entered_val === currentQuestion.answer){
			correct++;
			$("#questionSection").html("Correct!");
			correctDisplay();
			windowTimeout = setTimeout(function(){
				run();
			}, 2000);
		}
		else{
			wrong++;
			wrongDisplay();
			windowTimeout = setTimeout(function(){
				run();
			}, 2000);
		}
	});
	//Option3
	$("#op3").on("click", function(){
		maxTime = -1;
		clicked = true;
		clearInterval(intervalId);
		entered_val = $("#op3").text();
		if(entered_val === currentQuestion.answer){
			correct++;
			correctDisplay();
			windowTimeout = setTimeout(function(){
				run();
			}, 2000);
		}
		else{
			wrong++;
			wrongDisplay();
			windowTimeout = setTimeout(function(){
				run();
			}, 2000);
		}
	});
	//Option4
	$("#op4").on("click", function(){
		maxTime = -1;
		clicked = true;
		clearInterval(intervalId);
		entered_val = $("#op4").text();
		if(entered_val === currentQuestion.answer){
			correct++;
			correctDisplay();
			windowTimeout = setTimeout(function(){
				run();
			}, 2000);
		}
		else{
			wrong++;
			wrongDisplay();
			windowTimeout = setTimeout(function(){
				run();
			}, 2000);
		}
	});
}
// -----------------------------------------------------------
//Final result display after the quiz is done
// -----------------------------------------------------------
var showResult = function(){
	$("#questionSection").html("<p>Done</p>");
	$("#questionSection").append("<p>Correct: "+correct+ "</p>");
	$("#questionSection").append("<p>Incorrect : "+wrong+ "</p>");
	$("#questionSection").append("<p>Not Answered : "+notanswered+ "</p>");
	$('#option1, #option2, #option3, #option4' ).html("");
	clearInterval(intervalId);
	$("#restart").show();
}
// -----------------------------------------------------------
//Creating the option buttons
// -----------------------------------------------------------
var createOptions = function(cq){
	var op1 = $("<button>").attr("id", "op1").text(cq.option1);
	$("#option1").html(op1);
	var op2 = $("<button>").attr("id", "op2").text(cq.option2);
	$("#option2").html(op2);
	var op3 = $("<button>").attr("id", "op3").text(cq.option3);
	$("#option3").html(op3);
	var op4 = $("<button>").attr("id", "op4").text(cq.option4);
	$("#option4").html(op4);
	onClick();
}
// -----------------------------------------------------------
//Displays the questions from the question array objects
// -----------------------------------------------------------
var displayQuestion = function(){
	clicked = false;
	currentQuestion = questions[qNumber];
	$("#questionSection").html("<h1>"+questions[qNumber].q+"</h1>");
	createOptions(currentQuestion);
	qNumber++;
}
// -----------------------------------------------------------
//For questions unanswered
// -----------------------------------------------------------
var timeoutDisplay = function(){
	$("#questionSection").html("<p>Time Out!</p>");
	$("#questionSection").append("<p>Correct answer is: "+ currentQuestion.answer+ "</p>");
	image = $("<img>");
	image.attr('src', currentQuestion.imgsrc);
	$("#questionSection").append(image);
	$('#option1, #option2, #option3, #option4' ).html("");
}
// -----------------------------------------------------------
//For the correct questions answered
// -----------------------------------------------------------
var correctDisplay = function(){
	$("#questionSection").html("Correct!");
	image = $("<img>");
	image.attr('src', currentQuestion.imgsrc);
	$("#questionSection").append(image);
	$('#option1, #option2, #option3, #option4' ).html("");
}
// -----------------------------------------------------------
//For questions answered incorrect
// -----------------------------------------------------------
var wrongDisplay = function(){
	$("#questionSection").html("<p>Oops! that was a wrong selection</p>");
	$("#questionSection").append("<p>Correct answer is: "+ currentQuestion.answer+ "</p>");
	image = $("<img>");
	image.attr('src', currentQuestion.imgsrc);
	$("#questionSection").append(image);
	$('#option1, #option2, #option3, #option4' ).html("");
}
// -----------------------------------------------------------
//Calling initialize function
// -----------------------------------------------------------
initialize();
// -----------------------------------------------------------
//Restarting once the quiz is done
// -----------------------------------------------------------
$("#restart").on("click", function(){
	initialize();
});
});