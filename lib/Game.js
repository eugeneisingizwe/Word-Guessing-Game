const inquirer = require("inquirer");
const chalk = require("chalk");
const Word = require("./Word");
const words = require("./Words");

// The Game constructor is responsible for keeping score and controlling the flow of the overall game

class Game {
    // Save a reference for "this" in "this" as "this" will change inside of inquirer 

    constructor () {
        this.guessLeft = 0;
    }

    // Sets the guesses to 10 and get the next nword 

    play() {
        this.guessLeft = 10;
        this.nextWord();
    }

     // Creates a new Word object using a random word from the array, asks the user for their guess
    nextWord() {
        const randomWord = words[Math.floor(Math.random() * words.length )];
        this.currentWord = new Word(randomWord);
        console.log("\n" + this.currentWord.toString() + "\n");
        this.makeGuess();
    }

    // Uses inquirer to prompt the user for their 

    makeGuess() {
        this.askForLetter().then(() =>{
            // if the user has go guess remaining after this guess, show them the word, ask if they want to play again
            if (this.guessLeft < 1){
                console.log(
                    'No guesses left! the word was: "'
                    + this.currentWord.getSolution() +
                    '"\n'
                );
                this.askToPlayAgain();
                  // If the user guessed all letters of the current word correctly, reset guessesLeft to 10 and get the next word
            } else if (this.currentWord.guessCorrectly()) {
                console.log("You got it right! Next word!");
                this.guessLeft = 10;
                this.nextWord();
                // Otherwise prompt the user to guess the next letter
            } else {
                this.makeGuess
            }

        });
    }

    //Ask the user if they want to play again after runnung out of the guessLeft 

    askToPlayAgain() {
        inquirer
        .prompt([
            {
                type: "confirm",
                name: "choice",
                message: "Play Again?"
            }
        ]).then(value => {
            // if the user say yes to Another game, play again, otherwaise quit the game 

            if (value.choice){
                this.play();
            } else {

                this.quit();
            }
            
        })
    }

    //promot the user for a letter

    askForLetter(){
        return inquirer
        .prompt([
                {
                    type: "input",
                    name: "choice",
                    message: "Guess a letter!",
                    // The users guess must be a number or letter
                    validate: val => /[a-z1-9]/gi.test(val),
                }
            ] ).then(val => {
                // If the user's guess is in the current word, log that they chose correctly

                const didGuessCorrectly = this.currentWord.guessletter(val.choice);

                if (didGuessCorrectly) {
                    console.log(chalk.green("\nCORRECT!!!\n"));

                    //Otherwise decrement "guessLeft" , and let the user know how many guessess they have left
                } else {
                    this.guessLeft--,
                    console.log(chalk.red("\nINCORRECT!!!\n"));
                    console.log(this.guessLeft + "guesses remaining!!! \n");
                }

                console.log(this.currentWord.toString() + "\n");
            });
    }

    //logs goodbye and exit the node app
    quit() {
        console.log("\nGoodbye!");
        process.exit(0);
    }
}

module.exports = Game;