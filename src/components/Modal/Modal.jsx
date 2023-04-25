import './Modal.scss';

export const Modal = ({ setOpen, mode }) => {
    return(
        <div className='modal'>
            <div className='content'>
                <button className='close' onClick={() => setOpen('')}>
                    x
                </button>
                {mode === 'about' &&
                <>
                <h2>About</h2>
                <p>
                    A Wordle clone in russian language recreated from scratch in React.<br/><br/>
                    The objective of the game is to guess the 5-lettered word in 6 tries.<br/>
                    Use the keyboard at the bottom to type in a word and press the blue button.<br/>
                    If such a word exists, you will get hints towards the right word in the form of typed letters changing colors.<br/>
                    Green letters mean the right word contains them in the same place as the typed word.<br/>
                    Yellow letters mean the right word contains them in a different place in the word.<br/>
                    Dark gray letters mean the right word does not contain them.<br/><br/>
                    Remember, the word may contain several of the same letter.<br/>
                    You don't neccessarily need to type a word <i>without</i> dark gray letters.<br/>
                    The right word may be difficult and somewhat obscure since it's just a random word from a dictionary
                    of 3000+ words. Future versions may fix that with manually selected words.
                </p>
                </>
                }
                {mode === 'settings' &&
                <h2>Settings</h2>
                }
            </div>
        </div>
    );
}