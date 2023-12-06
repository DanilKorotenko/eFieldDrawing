class Charge
{
    static k = 5000.;

    constructor(x, y, q)
    {
        this.x = x;
        this.y = y;
        this.q = q;
    }

    getElectricField(x,y)
    {
        let dx = this.x - x;
        let dy = this.y - y;
        let rSquare = ((dx*dx) + (dy * dy))

        let angle = Math.atan2(y - this.y, x - this.x);

        let m = Charge.k * this.q / rSquare;

        return [Math.cos(angle) * m, Math.sin(angle) * m];
    }
}
