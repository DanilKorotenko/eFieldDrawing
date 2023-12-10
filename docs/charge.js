class Charge
{
    static k = 5000.;

    constructor(x, y, q, name)
    {
        this.x = x;
        this.y = y;
        this.q = q;
        this.name = name;
    }

    getElectricField(x,y)
    {
        let dx = this.x - x;
        let dy = this.y - y;
        let rSquare = ((dx * dx) + (dy * dy))

        let angle = Math.atan2(y - this.y, x - this.x);

        // let m = Charge.k * Math.abs(this.q) / rSquare;
        let m = Charge.k * this.q / rSquare;

        let cosAngle = Math.cos(angle);
        let sinAngle = Math.sin(angle);

        let e = new ElectricField(Math.cos(angle) * m, Math.sin(angle) * m);

        return e;
    }

    getPoint()
    {
        return new Point(this.x, this.y);
    }

    isSignsEqual(charge2)
    {
        let thisPositive = this.q >=0;
        let rightPositive = charge2.q >=0;

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
