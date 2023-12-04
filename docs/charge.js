class Charge
{
    static radius = 10;

    constructor(aCtx, anX, anY, aCharge)
    {
        this.ctx = aCtx;
        this.point = new Point(anX, anY);
        this.charge = aCharge;
    }

    draw()
    {
        this.ctx.beginPath();
        this.ctx.arc(this.point.x, this.point.y, Charge.radius, 0, 2 * Math.PI);
        this.ctx.fill();
    }

}