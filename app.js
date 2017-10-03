var inquirer = require('inquirer');
var questions = require('./Cards.js').cards;
var closeQuestions = [];
var flashCards = require('./flashCards.js');
var currentQuestion = 0;
var answerRight = 0;
var answerWrong = 0;

// console.log(questions);

for (var i = 0; i < questions.length; i++) {
	var q = new flashCards.ClozeCard(questions[i].full, questions[i].cloze);
	closeQuestions.push(q);
}

function askQuestion() {
	inquirer.prompt([
		{
			type: 'input',
			message: closeQuestions[currentQuestion].partial + '\nAnswer: ',
			name: 'userGuess'
		}
	]).then(function (answers) {
		console.log('\n');

		// Check if the user has guessed correctly
		if (answers.userGuess.toLowerCase() === closeQuestions[currentQuestion].cloze.toLowerCase()) {
			console.log('Correct!');
			answerRight++;
		} else {
			console.log('Incorrect!');
			answerWrong++;
		}

		// Show the correct answer
		console.log(closeQuestions[currentQuestion].full);
		console.log('-------------------------------------\n');

		// Advance to the next question
		if (currentQuestion < closeQuestions.length - 1) {
			currentQuestion++;
			askQuestion();
		} else {
			console.log('Game Over!');
			console.log('Correct Answers: ' + answerRight);
			console.log('Incorrect Answers: ' + answerWrong);
			if (answerRight >= 5) {
				console.log("You're pretty good.")

			} else {
				console.log("A SHAMEFUL DISPLAY!")
			}

			console.log('-------------------------------------\n');

			// Prompt the user to play again
			inquirer.prompt([
				{
					type: 'confirm',
					message: 'Want another try?',
					name: 'playAgain'
				}
			]).then(function (answers) {
				if (answers.playAgain) {
					// Reset the game
					currentQuestion = 0;
					answerRight = 0;
					answerWrong = 0;

					// Begin asking the questions!
					askQuestion();
				} else {
					// Exit the game
					console.log('Fine then.');
				}
			})
		}
	})
}

// Begin asking the questions!
askQuestion();