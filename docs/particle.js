class Particle
{
    constructor(aTheta, aCenterPoint, anIsPositive)
    {
        this.r = 20;
        this.theta = aTheta;
        this.center = aCenterPoint;
        this.isPositive = anIsPositive;

        this.point = this.initPoint();
    }

    initPoint()
    {
        const x = this.center.x + (this.r * Math.cos(this.theta));
        const y = this.center.y + (this.r * Math.sin(this.theta));
        const point = new Point(x, y);

        return point;
    }

    addEField(efield)
    {
        this.point.x = this.point.x + 0.01 * efield.x;
        this.point.y = this.point.y + 0.01 * efield.y;
    }
}
