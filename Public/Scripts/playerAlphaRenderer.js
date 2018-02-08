class PlayerAlphaRenderer extends PlayerRenderer {
    constructor(player) {
        super(player, (context, targetRect, symbol) => {
            let fontSize = Math.round(targetRect.width * targetRect.height * 0.02);
            context.font = `${fontSize}px Comic Sans MS`;
            context.fillStyle = "black";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText(symbol, targetRect.x + targetRect.width / 2, targetRect.y + targetRect.height / 2);
        });
    }
}