import { useState } from 'react';
import './Controls.scss';
import { Modal } from '../Modal/Modal';

export const Controls = ({ clickNewGame, changeTries, tries }) => {
    const [modal, setModal] = useState('');

    return (
        <div className="controls-panel">
            <button className="controls-button" onClick={clickNewGame}>
                Новая игра
            </button>
            <button className="controls-button" onClick={() => setModal('about')}>
                Об игре
            </button>
            <button className="controls-button" onClick={() => setModal('settings')}>
                Настройки
            </button>
            {modal !== '' && 
                <Modal 
                    setOpen={() => setModal('')} mode={modal}
                    changeTries={changeTries}
                    tries={tries}
                />}
        </div>
    );
}