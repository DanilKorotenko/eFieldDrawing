class Charge
{
    static k = 5000;

    constructor(x, y, q, name)
    {
        this.x = x;
        this.y = y;
        this.q = q;
        this.name = name;
    }

    getElectricField(x, y)
    {
        const dx = this.x - x;
        const dy = this.y - y;
        const rSquare = ((dx * dx) + (dy * dy));

        const angle = Math.atan2(y - this.y, x - this.x);

        // let m = Charge.k * Math.abs(this.q) / rSquare;
        const m = Charge.k * this.q / rSquare;

        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);

        const e = new ElectricField(Math.cos(angle) * m, Math.sin(angle) * m);

        return e;
    }

    getPoint()
    {
        return new Point(this.x, this.y);
    }

    isSignsEqual(charge2)
    {
        const thisPositive = this.q >= 0;
        const rightPositive = charge2.q >= 0;

        if (thisPositive && rightPositive)
        {
            return true;
        }
        else if (!thisPositive && !rightPositive)
        {
            return true;
        }

        return false;
    }
}
