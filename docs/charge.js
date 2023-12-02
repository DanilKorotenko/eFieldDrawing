class Charge
{
    static radius = 10;

    constructor(aCtx, anX, anY, anIntensity)
    {
        this.ctx = aCtx;
        this.x = anX;
        this.y = anY;
        this.intensity = anIntensity;
    }

    draw()
    {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, Charge.radius, 0, 2 * Math.PI);
        this.ctx.fill();
    }
}