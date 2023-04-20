import './Cell.scss';

export const Cell = ({ content, color}) => {
    return (
        <div className={'cell ' + color}>
            {content}
        </div>
    );
}