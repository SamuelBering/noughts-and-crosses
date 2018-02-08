class GameEngine {

    constructor(gameBoardRenderer, endGameCallbackFunc) {
        this.gameBoardRenderer = gameBoardRenderer;
        this.endGameCallbackFunc = endGameCallbackFunc;
        this.gameBoard = this.gameBoardRenderer.gameBoard;
        this.mapPlayers(this.gameBoardRenderer.playerRenderes);
        this.currentPlayerIndex = 0;
        this.turns = 0;
    }

    mapPlayers(playerRenderes) {
        let players = [];

        for (let playerRenderer of Object.values(playerRenderes)) {
            players.push(playerRenderer.player);
        }

        this.players = players;
    }

    showPlayerInfo() {
        let name=this.players[this.currentPlayerIndex].name;
        let symbol=this.players[this.currentPlayerIndex].symbol;
        this.gameBoardRenderer.showMessage(`Spelare: <strong>${name} (${symbol})</strong>`);
    }

    run() {
        this.gameBoardRenderer.Render();
        this.showPlayerInfo();
        this.gameBoardRenderer.onClick = this.executeRound.bind(this);
    }

    executeRound(col, row) {
        
        let cellContent = this.gameBoard.getSymbol(col, row);
        if ((cellContent) != "")
            return;

        this.gameBoard.setSymbol(col, row, this.players[this.currentPlayerIndex].symbol);

        this.gameBoardRenderer.RenderCell(col, row);

        if (this.hasWon(this.players[this.currentPlayerIndex], col, row)) {
            this.players[this.currentPlayerIndex].hasWon = true;
            this.endGame({
                player: this.players[this.currentPlayerIndex],
                status: "won"
            });
            return;
        }

        if (this.turns == (this.gameBoard.cols * this.gameBoard.rows) - 1) {
            this.endGame({
                status: "even"
            });
            return;
        }

        this.turns++;
        this.currentPlayerIndex = this.turns % this.players.length;   
        this.showPlayerInfo();
    }

    hasWon(player, col, row) {
        let symbolsCount = this.gameBoard.countSymbolsAllDirections(player.symbol, col, row);

        console.log(`Player ${player.symbol} has ${symbolsCount} symbols`);

        if (symbolsCount > 4)
            return true;
        else
            return false;
    }

    endGame(status) {
        this.gameBoardRenderer.onClick = undefined;
        this.endGameCallbackFunc(status);
    }


}