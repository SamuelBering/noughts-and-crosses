class GameEngine {

    constructor(gameBoardRenderer) {
        this.gameBoardRenderer = gameBoardRenderer;
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


    run() {
        this.gameBoardRenderer.Render();
        this.gameBoardRenderer.onClick = this.executeRound.bind(this);
    }

    executeRound(col, row) {
        this.currentPlayerIndex = this.turns % this.players.length;

        let cellContent = this.gameBoard.getSymbol(col, row);
        if ((cellContent) != "")
            return;

        this.gameBoard.setSymbol(col, row, this.players[this.currentPlayerIndex].symbol);

        this.gameBoardRenderer.RenderCell(col, row);

        console.log("currentplayer: " + this.currentPlayerIndex + "  " + col + "  " + row);

        this.turns++;

    }


}