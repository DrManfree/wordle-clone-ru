import './Field.scss';
import { Row } from './Row/Row';

export const Field = ({ rows, colors }) => {
    return (
        <div className='field'>
            {rows.map((row, rowIndex) =>
                <Row
                    row={row}
                    key={rowIndex}
                    rowIndex={rowIndex}
                    colors={colors}
                />
            )}
        </div>
    );
}