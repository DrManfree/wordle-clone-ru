import { useState } from 'react';
import './App.scss';
import { WORDS } from './russian_nouns';

const ALPHABET = [
  'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ',
  'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', '<',
  'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '✓'
];

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

const winWord = WORDS[getRandomInteger(0, WORDS.length)];
console.log(winWord);

export const App = () => {

  const [rows, setRows] = useState(new Array(6).fill(new Array(5).fill('')));
  const [colors, setColors] = useState(new Array(6).fill(new Array(5).fill('')));
  const [keyColors, setKeyColors] = useState({});
  const [activeRow, setActiveRow] = useState(0);
  const [activeLetter, setActiveLetter] = useState(0);
  const [win, setWin] = useState(false);
  const [typedWords, setTypedWords] = useState([]);

  function validateRow(rowIndex) {
    let letters = rows[rowIndex];

    for (let i = 0; i < letters.length; i++) {
      if (winWord[i] === letters[i]) {
        setColors(prevColors => {
          return ([
            ...prevColors.slice(0, rowIndex),
            [
              ...prevColors[rowIndex].slice(0, i),
              'green',
              ...prevColors[rowIndex].slice(i + 1)
            ],
            ...prevColors.slice(rowIndex + 1)
          ]);
        });
        setKeyColors(prevKeyColors => {
          let newState = prevKeyColors;
          newState[letters[i]] = 'green';
          return(newState);
        })
      }

      else if (winWord.includes(letters[i]) && 
      letters[winWord.indexOf(letters[i])] !== letters[i] &&
      letters.indexOf(letters[i]) === i)
      {
        setColors(prevColors => {
          return ([
            ...prevColors.slice(0, rowIndex),
            [
              ...prevColors[rowIndex].slice(0, i),
              'yellow',
              ...prevColors[rowIndex].slice(i + 1)
            ],
            ...prevColors.slice(rowIndex + 1)
          ]);
        });
        if (keyColors[letters[i]] !== 'green') {
          setKeyColors(prevKeyColors => {
            let newState = prevKeyColors;
            newState[letters[i]] = 'yellow';
            return (newState);
          })
      }
      }


      else {
        setColors(prevColors => {
          return ([
            ...prevColors.slice(0, rowIndex),
            [
              ...prevColors[rowIndex].slice(0, i),
              'gray',
              ...prevColors[rowIndex].slice(i + 1)
            ],
            ...prevColors.slice(rowIndex + 1)
          ]);
        });
        if (!keyColors[letters[i]]) {
          setKeyColors(prevKeyColors => {
            let newState = prevKeyColors;
            newState[letters[i]] = 'gray';
            return (newState);
          })
        }
      }
    }
  }

  function handleInput(letter) {
    if (letter === '<') {
      if (activeLetter === 0 || win) return;

      setRows(prevRows => {
        return ([
          ...prevRows.slice(0, activeRow),
          [
            ...prevRows[activeRow].slice(0, activeLetter - 1),
            '',
            ...prevRows[activeRow].slice(activeLetter)
          ],
          ...prevRows.slice(activeRow + 1)
        ]);
      });
      setActiveLetter(activeLetter - 1);
    }
    else if (letter === '✓') {
      if (activeLetter !== 5 || win) return;

      let typedWord = rows[activeRow].join('');

      if (typedWord === winWord) {
        validateRow(activeRow);
        setWin(true);
      }

      else if (WORDS.includes(typedWord) && !typedWords.includes(typedWord)) {
        validateRow(activeRow);
        setTypedWords(prev => [...prev, typedWord]);
        setActiveRow(activeRow + 1);
        setActiveLetter(0);
      }

      else return;
    }
    else {
      if (activeLetter === 5 || win) return;
      setRows(prevRows => {
        return ([
          ...prevRows.slice(0, activeRow),
          [
            ...prevRows[activeRow].slice(0, activeLetter),
            letter,
            ...prevRows[activeRow].slice(activeLetter + 1)
          ],
          ...prevRows.slice(activeRow + 1)
        ]);
      });
      setActiveLetter(activeLetter + 1);
    }
  }

  return (
    <div className="App">
      <h1 className='header'>Wordle Clone</h1>

      <div className='field'>
        {rows.map((row, rowIndex) => {
          return (
          <div className='row' key={rowIndex}>
            {row.map((cell, cellIndex) => {
              let classnames = 'cell ' + colors[rowIndex][cellIndex];
              return (
              <div className={classnames} key={cellIndex}>
                {cell}
              </div>);
            })}
          </div>);
        })}
      </div>

      <div className='keyboard'>
        {
          ALPHABET.slice(0, 12).map((letter, index) => {
            let classnames = 'key ';
            if (keyColors[letter.toLowerCase()])
              classnames += keyColors[letter.toLowerCase()];
            if (letter === '<')
              classnames += ' backspace';
            else if (letter === '✓')
              classnames += ' enter';

            let element =
              <button className={classnames} key={index} onClick={() => handleInput(letter.toLowerCase())}>
                {letter}
              </button>;

            return element;
          })
        }
          <div className='divider'></div>
        {
          ALPHABET.slice(13, 24).map((letter, index) => {
            let classnames = 'key ';
            if (keyColors[letter.toLowerCase()])
              classnames += keyColors[letter.toLowerCase()];
            if (letter === '<')
              classnames += ' backspace';
            else if (letter === '✓')
              classnames += ' enter';

            let element =
              <button className={classnames} key={index} onClick={() => handleInput(letter.toLowerCase())}>
                {letter}
              </button>;

            return element;
          })
        }
          <div className='divider'></div>
        {
          ALPHABET.slice(26).map((letter, index) => {
            let classnames = 'key ';
            if (keyColors[letter.toLowerCase()])
              classnames += keyColors[letter.toLowerCase()];
            if (letter === '<')
              classnames += ' backspace';
            else if (letter === '✓')
              classnames += ' enter';

            let element =
              <button className={classnames} key={index} onClick={() => handleInput(letter.toLowerCase())}>
                {letter}
              </button>;

            return element;
          })
        }
      </div>

    </div>
  );
}
