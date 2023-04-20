import './Row.scss';

export const Row = ({ letters, keyColors, handleInput }) => {
    return (
        letters.map((letter, index) => {
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
    );
}