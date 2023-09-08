const Letter = require("./Letter");

// The Word class is responsible for creating an array of Letter objects and determining if the user guessed every Letter correctly

class Word {
    constructor (word) {
         // word.split - splits word into array of letters
    // .map - instantiate a new `Letter` for each character and return an array
    // referred to with the instance variable, `letters`

    this.letters = word.split("").map(char => new Letter(char));

    }

    getSolution() {
         // iterate over each letter and return the solution for each 
      // to form an array of solved letters
      // create a string from the array of solved letters
        return this.Letters.map(letter => letter.getSolution()).join(" ");
      
    }
     // setting `toString()` as a method lets us concatenate it like we would a string!
  toString() {
    return this.letters.join(" "); // see Letter.prototype.toString in Letter.js
  }

    guessletter(char) {
        // Checks to see if any of the letters in the array match the user's guess and updates `foundLetter`
        let foundLetter = false;
        this.letters.forEach(letter => {
          if (letter.guess(char)) {
            foundLetter = true;
          }
        })
        // return whether we found a letter 
        return foundLetter;
    }

    // Returns true if all letters in the word have been guessed

    guessCorrectly() {
        //the "every" method return true if the callback fucntion returns true for every elements in the array
        return this.letters.every(letter => letter.visible);
    }
}

module.exports = Word;