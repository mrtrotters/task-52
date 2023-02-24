import React, { Component } from "react";
import { randomWord } from './words';
import './App.css';

import img1 from "./Images/state1.GIF";
import img2 from "./Images/state2.GIF";
import img3 from "./Images/state3.GIF";
import img4 from "./Images/state4.GIF";
import img5 from "./Images/state5.GIF";
import img6 from "./Images/state6.GIF";
import img7 from "./Images/state7.GIF";
import img8 from "./Images/state8.GIF";
import img9 from "./Images/state9.GIF";
import img10 from "./Images/state10.gif";
import img11 from "./Images/state11.GIF"


class Hangman extends Component {
  /** by default, allow 11 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 11,
    images: [ img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11]
  };

  constructor(props) {
    super(props);

    this.state = { 
      nWrong: 0, 
      guessed: new Set(), 
      // answer: "apple"
      answer: randomWord() 
    };

    this.handleGuess = this.handleGuess.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  // reset the game and put things in default
  resetGame() {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    });
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    // deconstructor
    const { answer, guessed } = this.state;

    return answer
      .split("")
      .map(ltr => (guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;

    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    const  { handleGuess } = this;
    const { guessed } = this.state;

    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr, index) => (
      <button
        key={index}
        value={ltr}
        onClick={handleGuess}
        disabled={guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  /** render: render game */
  render() {
    const { nWrong, answer} = this.state;
    const { images, maxWrong } = this.props;

    let alternateText = `${this.state.nWrong} wrong guesses`;
    // const { guessedWord, generateButtons } = this;

    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={images[nWrong]} alt={alternateText}/>
        <p>Number Wrong: {nWrong}</p>

        
        { answer === this.guessedWord().join("") ? <p>You WIN!</p> :

          (nWrong === maxWrong ?
        <div>
          <p>YOU LOSE </p>
          <p>Correct Word is: {answer}</p>
        </div>
        :
        <div>
        <p className='Hangman-word'>{this.guessedWord()}</p>
        <p className='Hangman-btns'>{this.generateButtons()}</p>
      </div>)
      }

      <button id='reset' onClick={this.resetGame}>Reset Game</button>
      </div>
    );
  }
}

export default Hangman;
