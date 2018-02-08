class GameBoard {

    constructor(cols, rows) {
        this.cols = cols;
        this.rows = rows;
        this.board = new Array(cols * rows).fill("");
    }

    getSymbol(col, row) {
        if (col < 0 || col > this.cols - 1 || row < 0 || row > this.rows - 1)
            return undefined;

        return this.board[row * this.cols + col];
    }

    setSymbol(col, row, symbol) {
        this.board[row * this.cols + col] = symbol;
    }

    countSymbolsAllDirections(symbol, col, row) {
        let directions = [];

        let west = this.countSymbols(symbol, col, row, currentPoint => currentPoint.col--);
        let east = this.countSymbols(symbol, col + 1, row, currentPoint => currentPoint.col++);
        directions.push(east + west);

        let north = this.countSymbols(symbol, col, row, currentPoint => currentPoint.row--);
        let south = this.countSymbols(symbol, col, row + 1, currentPoint => currentPoint.row++);
        directions.push(north + south);

        let northWest = this.countSymbols(symbol, col, row, currentPoint => {
            currentPoint.row--;
            currentPoint.col--;
        });

        let southEast = this.countSymbols(symbol, col + 1, row + 1, currentPoint => {
            currentPoint.row++;
            currentPoint.col++;
        });

        directions.push(northWest + southEast);


        let southWest = this.countSymbols(symbol, col, row, currentPoint => {
            currentPoint.row++;
            currentPoint.col--;
        });

        let northEast = this.countSymbols(symbol, col + 1, row - 1, currentPoint => {
            currentPoint.row--;
            currentPoint.col++;
        });

        directions.push(southWest + northEast);

        let max = Math.max(...directions);

        return max;
    }

    countSymbols(symbol, col, row, nextPositionFunc) {
        let currentPoint = { col: col, row: row };
        let currentSymbol = this.getSymbol(currentPoint.col, currentPoint.row);
        let counter = 0;
        while (currentSymbol == symbol) {
            counter++;
            nextPositionFunc(currentPoint);
            currentSymbol = this.getSymbol(currentPoint.col, currentPoint.row);
        }

        return counter;
    }
}