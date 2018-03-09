import * as React from 'react';
import cx from 'classnames';

const columnCount = 3;

const titles = [
    ['red', 'green', 'blue'],
    ['hotpink', 'lightgreen', 'fuchsia'],
    ['orange', 'yellow'],
];

const CatalogueRow = ({ children }) => (<div className="row">{children}</div>);

const CatalogueItem = ({ title, focused, displayed, onClick }) => (
    <div
        style={{ background: title }}
        className={cx('tile', { focused, displayed })}
        onClick={onClick} />
);

export class Catalogue extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { focusedRow: 0, focusedColumn: 0, focusedTitle: null };
    }

    componentDidMount() {
        this.props.remote.addEventListener('keyup', this.onKeyUp);
    }

    render() {
        return (
            <div>
                <div className="titleBox">
                    <div className="title">
                        {this.state.focusedTitle ? this.state.focusedTitle : null}
                    </div>
                </div>
                <div className="tilesBox">
                    {titles.map((row, i) => (
                        <CatalogueRow key={titles[i].join(',')}>
                            {row.map((t, j) => (
                                <CatalogueItem key={t}
                                               title={t}
                                               focused={i === this.state.focusedRow && j === this.state.focusedColumn}
                                               displayed={titles[i][j] === this.state.focusedTitle}
                                               onClick={() => this.onItemClick(i, j)}
                                />
                            ))}
                        </CatalogueRow>
                    ))}
                </div>
            </div>
        );
    }



    onKeyUp = ({ key }) => {
        const { focusedRow, focusedColumn } = this.state;
        if (key === 'UP') {
            this.setState({ focusedRow: Math.max(0, this.state.focusedRow-1) });
        } else if (key === 'DOWN') {
            const nextRow = focusedRow + 1;
            const canNavigate = titles[nextRow] && titles[nextRow][focusedColumn];
            if (canNavigate) {
                this.setState({ focusedRow: nextRow });
            }
        } else if (key === 'LEFT') {
            this.setState({ focusedColumn: Math.max(0, this.state.focusedColumn-1) });
        } else if (key === 'RIGHT') {
            const nextCol = focusedColumn + 1;
            const canNavigate = titles[focusedRow] && titles[focusedRow][nextCol];
            if (canNavigate) {
                this.setState({ focusedColumn: nextCol });
            }
            this.setState({ focusedColumn: nextCol });
        } else if (key === 'ENTER') {
            this.setState({ focusedTitle: titles[this.state.focusedRow][this.state.focusedColumn] });
        } else if (key === 'BACK') {
            this.setState({ focusedTitle: null });
        }
    };

    onItemClick = (row, col) => {
        this.setState({
            focusedRow: row,
            focusedColumn: col,
            focusedTitle: titles[row][col]
        });
    };
}