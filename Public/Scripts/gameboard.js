class GameBoard {

    constructor(cols, rows) {
        this.cols = cols;
        this.rows = rows;
        this.board = new Array(cols * rows).fill("");
    }

    getSymbol(col, row) {
        return this.board[row * this.cols + col];
    }

    setSymbol(col, row, symbol) {
        this.board[row * this.cols + col] = symbol;
    }
}