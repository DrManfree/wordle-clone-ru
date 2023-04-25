import { useCallback, useState } from 'react';
import './App.scss';
import { WORDS } from './russian_nouns';
import { Field } from './components/Field/Field';
import { ALPHABET, TRIES, WORD_LENGTH } from './constants/index';
import { getRandomInteger } from './constants/helpers';
import { Row } from './components/Keyboard/Row/Row';
import { Controls } from './components/Controls/Controls';

export const App = () => {

  const [rows, setRows] = useState(new Array(TRIES).fill(new Array(WORD_LENGTH).fill('')));
  const [colors, setColors] = useState(new Array(TRIES).fill(new Array(WORD_LENGTH).fill('')));
  const [keyColors, setKeyColors] = useState({});
  const [activeRow, setActiveRow] = useState(0);
  const [activeLetter, setActiveLetter] = useState(0);
  const [win, setWin] = useState(false);
  const [typedWords, setTypedWords] = useState([]);
  const [winWord, setWinWord] = useState(WORDS[getRandomInteger(0, WORDS.length)]);

  const [newGameAnimation, setNewGameAnimation] = useState(false);

  const startNewGame = useCallback(() => {
    setWinWord(WORDS[getRandomInteger(0, WORDS.length)]);
    setRows(new Array(TRIES).fill(new Array(WORD_LENGTH).fill('')));
    setColors(new Array(TRIES).fill(new Array(WORD_LENGTH).fill('')));
    setKeyColors({});
    setActiveRow(0);
    setActiveLetter(0);
    setWin(false);
    setTypedWords([]);

    setNewGameAnimation(true);
  }, []);

  const validateRow = useCallback((rowIndex) => {
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
  }, [rows, keyColors, winWord]);

  const handleInput = useCallback((letter) => {
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
  }, [activeLetter, activeRow, rows, typedWords, validateRow, win, winWord]);

  return (
    <div 
      className={newGameAnimation ? 'App pulse' : 'App'}
      onAnimationEnd={() => setNewGameAnimation(false)}
    >
      <h1 className='header'>Wordle Clone</h1>
      <Controls clickNewGame={() => startNewGame()}/>
      <Field
        rows={rows}
        colors={colors}
      />

      <div className='keyboard'>
        <Row
          letters={ALPHABET.slice(0, 12)}
          keyColors={keyColors}
          handleInput={handleInput}
        />
        <div className='divider'></div>
        <Row
          letters={ALPHABET.slice(12, 24)}
          keyColors={keyColors}
          handleInput={handleInput}
        />
        <div className='divider'></div>
        <Row
          letters={ALPHABET.slice(24)}
          keyColors={keyColors}
          handleInput={handleInput}
        />
      </div>

    </div>
  );
}
