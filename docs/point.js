class Point
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    distance(aPoint)
    {
        const a = Math.abs(this.x - aPoint.x);
        const b = Math.abs(this.y - aPoint.y);

        const c = Math.sqrt(a * a + b * b);
        return c;
    }
}
