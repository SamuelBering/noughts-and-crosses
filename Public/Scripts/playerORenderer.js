class PlayerORenderer extends PlayerRenderer {
    constructor(player) {
        super(player, (context, targetRect) => {
            context.lineWidth = 1;
            this.drawEllipse(context, targetRect.x - targetRect.width * 0.4 / 2 + targetRect.width * 0.5,
                targetRect.y - targetRect.height * 0.4 / 2 + targetRect.height * 0.5,
                targetRect.width * 0.4, targetRect.height * 0.4);
        });
    }

    drawEllipse(ctx, x, y, w, h) {
        var kappa = .5522848,
            ox = (w / 2) * kappa, // control point offset horizontal
            oy = (h / 2) * kappa, // control point offset vertical
            xe = x + w,           // x-end
            ye = y + h,           // y-end
            xm = x + w / 2,       // x-middle
            ym = y + h / 2;       // y-middle

        ctx.beginPath();
        ctx.moveTo(x, ym);
        ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
        ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
        ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
        ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
        //ctx.closePath(); // not used correctly, see comments (use to close off open path)
        ctx.stroke();
    }
}