import './Modal.scss';
import { WORD_LENGTH } from '../../constants/index';
import { useContext } from 'react';
import { ThemeContext } from '../Theme/ThemeContext';

export const Modal = ({ setOpen, mode, changeTries, tries }) => {

    const {changeTheme, theme} = useContext(ThemeContext);

    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        changeTries(+formJson.tries);
        changeTheme(formJson.darkmode ? 'dark' : 'light');
    }

    return(
        <div className='modal'>
            <div className='content'>
                <button className='closeBtn' onClick={() => setOpen('')}>
                    x
                </button>
                {mode === 'about' &&
                <>
                    <h2>Об игре</h2>
                    <p>
                        Клон игры "Wordle", созданный с нуля с помощью React.<br /><br />
                        Цель игры - угадать загаданное слово за ограниченное число попыток.<br />
                        Используйте игровую клавиатуру, чтобы набрать слово и нажмите синюю кнопку.<br />
                        Если введенное слово валидно, вы получите подсказки о загаданном слове в виде изменений цветов введенных букв:<br />
                        Зеленые буквы содержатся в загаданном слове и стоят на том же самом месте.<br />
                        Желтые буквы содержатся в загаданном слове, но находятся в другом месте.<br />
                        Серые буквы не содержатся в загаданном слове.<br /><br />
                        Помните, что загаданное слово может содержать одну и ту же букву несколько раз.<br />
                        Возможно вводить слова с серыми буквами.<br />
                        Загаданное слово может быть довольно сложным, так как это случайное слово из словаря 3000+ 5-буквенных слов.
                        Будущие обновления, возможно, исправят это (например, вручную выбранный набор слов).
                    </p>
                </>
                }
                {mode === 'settings' &&
                <>
                    <h2>Настройки</h2>
                    <form className="inputs" onSubmit={handleSubmit}>
                        <label htmlFor="darkmode">
                            <input id="darkmode" name="darkmode" type="checkbox" defaultChecked={theme === 'dark'}/>
                            Темная тема
                        </label>
                        <label htmlFor="tries">
                            <input id="tries" name="tries"
                                type="number" min="1" max="7" defaultValue={tries}/>
                            Число попыток
                        </label>
                        <label htmlFor="wordLength">
                            <input id="wordLength" name="wordLength"
                                type="number" min="3" max="10" defaultValue={WORD_LENGTH} disabled/>
                            Длина слова
                        </label>
                        <button type="submit">Сохранить изменения</button>
                    </form>
                </>
                }
            </div>
        </div>
    );
}