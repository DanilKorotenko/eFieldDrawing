class Charge
{
    static k = 5000;

    constructor(x, y, q)
    {
        this.x = x;
        this.y = y;
        this.q = q;
    }

    getElectricField(x, y, anIsPositive)
    {
        const dx = x - this.x;
        const dy = y - this.y;
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

    getPoint()
    {
        return new Point(this.x, this.y);
    }
}
