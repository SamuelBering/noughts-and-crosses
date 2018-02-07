class PlayerXRenderer extends PlayerRenderer {
    constructor(player) {
        super(player, (context, targetRect) => {
            context.lineWidth = 1;
            context.moveTo(targetRect.x + targetRect.width * 0.3, targetRect.y + targetRect.height * 0.3);
            context.lineTo(targetRect.x + targetRect.width * 0.7, targetRect.y + targetRect.height * 0.7);
            context.moveTo(targetRect.x + targetRect.width * 0.3, targetRect.y + targetRect.height * 0.7);
            context.lineTo(targetRect.x + targetRect.width * 0.7, targetRect.y + targetRect.height * 0.3);
            context.stroke();
        });
    }
}