class GameBoardRenderer {

    constructor(gameBoard, playerRenderes, canvas) {
        this.gameBoard = gameBoard;
        this.MapPlayerRenderes(playerRenderes);
        this.canvas = canvas;
        this.canvas.addEventListener('click', this._onClick.bind(this), false);
        this.rowHeight = (this.canvas.height - 4) / this.gameBoard.rows;
        this.colWidth = (this.canvas.width - 4) / this.gameBoard.cols;
    }

    MapPlayerRenderes(playerRenderes) {
        let renderes = {};

        playerRenderes.forEach(r => {
            renderes[r.player.symbol] = r;
        });

        this.playerRenderes = renderes;
    }

    RenderContainer() {
        var context = this.canvas.getContext("2d");
        context.lineWidth = 1;

        for (let i = 0; i < this.gameBoard.rows + 1; i++) {
            context.moveTo(0, this.rowHeight * i + 2);
            context.lineTo(this.canvas.width, this.rowHeight * i + 2);
        }

        for (let i = 0; i < this.gameBoard.cols + 1; i++) {
            context.moveTo(this.colWidth * i + 2, 0);
            context.lineTo(this.colWidth * i + 2, this.canvas.height);
        }
        context.stroke();
    }

    _getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - Math.round(rect.left),
            y: evt.clientY - Math.round(rect.top)
        };
    }

    _onClick(evt) {
        let mousePos = this._getMousePos(this.canvas, evt);

        let rowHeight = (this.canvas.height) / this.gameBoard.rows;
        let colWidth = (this.canvas.width) / this.gameBoard.cols;

        let col = Math.floor(mousePos.x / colWidth);
        let row = Math.floor(mousePos.y / rowHeight);

        if (col < 0)
            col = 0;
        if (col > this.gameBoard.cols - 1)
            col = this.gameBoard.cols - 1;
        if (row < 0)
            row = 0;
        if (row > this.gameBoard.rows - 1)
            row = this.gameBoard.rows - 1;

        if (this.onClick)
            this.onClick(col, row);
    }

    RenderCell(col, row) {

        let symbol = this.gameBoard.getSymbol(col, row);

        if (symbol == "" || this.playerRenderes[symbol] == undefined)
            return;

        let targetRect = {
            x: col * this.colWidth + 2,
            y: row * this.rowHeight + 2,
            width: this.colWidth,
            height: this.rowHeight
        };

        var context = this.canvas.getContext("2d");

        this.playerRenderes[symbol].render(context, targetRect, symbol);


    }

    RenderCells() {
        for (let i = 0; i < this.gameBoard.rows; i++) {
            for (let j = 0; j < this.gameBoard.cols; j++) {
                this.RenderCell(this.canvas, j, i);
            }
        }
    }

    Render() {
        this.RenderContainer();
        this.RenderCells();
    }
}