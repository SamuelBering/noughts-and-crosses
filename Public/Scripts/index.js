function startGame(container, cols, rows, playerNames) {

    let players = [new Player(playerNames[0], "x"), new Player(playerNames[1], "o")];
    let symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    for (let i = 2; i < playerNames.length; i++) {
        players.push(new Player(playerNames[i], symbols[i - 2]));
    }

    let playerRenderes = [new PlayerXRenderer(players[0]), new PlayerORenderer(players[1])];

    for (let i = 2; i < players.length; i++) {
        playerRenderes.push(new PlayerAlphaRenderer(players[i]));
    }

    let gameBoard = new GameBoard(cols, rows);

    let canvas = document.createElement("canvas");

    canvas.width = cols * 30;
    canvas.height = rows * 30;

    let statusContainer = document.createElement("div");

    container.appendChild(statusContainer);
    container.appendChild(canvas);

    let gameBoardRenderer = new GameBoardRenderer(gameBoard, playerRenderes, canvas, statusContainer);

    let gameEngine = new GameEngine(gameBoardRenderer, (status) => {
        setTimeout(() => {
            let message = "";

            if (status.status == "won")
                message = `Grattis ${status.player.name} du har vunnit!!`;
            else
                message = "Oavgjort...";
            message += "Spela igen ? (OK)";

            if (confirm(message)) {
                container.innerHTML = "";
                startGame(container, cols, rows, playerNames);
            }
            else {
                container.innerHTML = "<p>Tack för den här gången!</p>"
            }
        }, 100);
    });

    gameEngine.run();
}

function insertBefore(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode);
}

function insertAfter(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}


function getUsers(container, callbackFunc) {
    let frm = "<form onsubmit='return false' id='playersForm'><label for='cols'>Kolumner: </label>"
        + "<input min='5' max='45' required type='number' id='cols' name='cols'/><br/>"
        + "<label for='rows'>Rader: </label><input min='5' max='45' required type='number' id='rows' name='rows'/><br/>"
        + "<label>Spelare 1: <input required name='players' type='text' /></label><br/>"
        + "<label>Spelare 2: <input required name='players' type='text' /></label><br/>"
        + "<button id='addPlayer'>+</button><br/>"
        + "<button id='playBtn' type='submit'>Spela</button></form>";
    container.innerHTML = frm;

    let addPlayerBtn = document.getElementById("addPlayer");
    addPlayerBtn.addEventListener("click", (e) => {
        let form = document.getElementById("playersForm");
        let playerCount = form.elements.namedItem("players").length;
        if (playerCount >= 9)
            return;

        let label = document.createElement("label");
        let input = document.createElement("input");
        input.setAttribute("required", "");
        let br = document.createElement("br");
        input.type = "text";
        input.name = "players";
        label.appendChild(document.createTextNode("Spelare " + (playerCount + 1)));
        label.appendChild(input);

        insertBefore(label, e.target);
        insertAfter(br, label);
    });

    let form = document.getElementById("playersForm");
    form.addEventListener("submit", (e) => {

        let form = document.getElementById("playersForm");
        let cols = form.elements.namedItem("cols").value;
        let rows = form.elements.namedItem("rows").value;
        let playersNodeList = form.elements.namedItem("players");
        let playerNamesList = Array.from(playersNodeList).map(i => i.value);
        let container = document.getElementById("container");
        container.innerHTML = "";
        callbackFunc(cols, rows, playerNamesList);
    });

}

(function () {

    let container = document.getElementById("container");
    getUsers(container, (cols, rows, playerNamesList) => {
        startGame(container, cols, rows, playerNamesList);
    });

})();

