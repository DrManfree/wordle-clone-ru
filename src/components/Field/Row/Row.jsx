import { Cell } from './Cell/Cell';
import './Row.scss';

export const Row = ({ row, rowIndex, colors }) => {
    return (
        <div className='row'>
            {row.map((cell, cellIndex) =>
                <Cell
                    content={cell}
                    key={cellIndex}
                    color={colors[rowIndex][cellIndex]}
                />
            )}
        </div>
    );
}