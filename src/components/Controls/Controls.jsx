import { useState } from 'react';
import './Controls.scss';
import { Modal } from '../Modal/Modal';

export const Controls = ({ clickNewGame }) => {
    const [modal, setModal] = useState('');

    return (
        <div className="controls-panel">
            <button className="controls-button" onClick={clickNewGame}>
                New game
            </button>
            <button className="controls-button" onClick={() => setModal('about')}>
                About
            </button>
            <button className="controls-button" onClick={() => setModal('settings')}>
                Settings
            </button>
            {modal !== '' && <Modal setOpen={() => setModal('')} mode={modal}/>}
        </div>
    );
}