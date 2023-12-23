class Charge
{
    static k = 5000;

    constructor(x, y, q)
    {
        this.point = new Point(x, y);
        this.q = q;
        this.isSelected = false;
    }

    draw(ctx, options)
    {
        ctx.beginPath();
        ctx.arc(this.point.x, this.point.y, options.chargeRadius, 0, 2 * Math.PI);
        ctx.fill();
    }

    getElectricField(x, y, anIsPositive)
    {
        const dx = x - this.point.x;
        const dy = y - this.point.y;
        const rSquare = ((dx * dx) + (dy * dy));

        let angle = Math.atan2(dy, dx);

        if (!this.isSameSign(anIsPositive))
        {
            angle = angle + Math.PI;
        }

        const m = Charge.k * Math.abs(this.q) / rSquare;

        const e = new ElectricField(Math.cos(angle) * m, Math.sin(angle) * m);

        return e;
    }

    isSameSign(anIsPositive)
    {
        return (this.isPositive() && anIsPositive) || (!this.isPositive() && !anIsPositive);
    }

    isPositive()
    {
        return this.q >= 0;
    }
}
