
let player1 = new Player("Samuel", "x");
let player2 = new Player("Andreas", "o");
let player1Renderer = new PlayerXRenderer(player1);
let player2Renderer = new PlayerORenderer(player2);

let gameBoard = new GameBoard(10, 10);
gameBoard.setSymbol(4, 4, "o");
gameBoard.setSymbol(4, 5, "x");

let canvas = document.getElementById("canvas");

let gameBoardRenderer = new GameBoardRenderer(gameBoard, [player1Renderer, player2Renderer], canvas);

gameBoardRenderer.Render();

let gameEngine = new GameEngine(gameBoardRenderer);

gameEngine.run();