import { readFileSync } from 'fs';

const parseInputFile = path => readFileSync(path).toString().trim();

const print2dArrayAsGrid = grid => {
    let gridStr = 'GRID\n\n';

    const transposedGrid = grid[0].map((_, colIndex) => grid.map(row => row[colIndex]));
    gridStr = gridStr.concat(
        '    ',
        transposedGrid[0].reduce((prev, curr, colIndex) => `${prev} ${colIndex}`),
        '\n'
    );
    for (const [i, row] of transposedGrid.entries()) {
        gridStr = gridStr.concat(`${i}   `);
        for (const point of row) {
            gridStr = gridStr.concat(point === 0 ? '. ' : `${point} `);
        }
        gridStr = gridStr.trim().concat('\n');
    }

    gridStr = gridStr.concat('\n-----------------------');
    console.log(gridStr);
};

export { parseInputFile, print2dArrayAsGrid };
