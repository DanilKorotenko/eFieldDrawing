class Point
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    distance(aPoint)
    {
        let a = Math.abs(this.x - aPoint.x);
        let b = Math.abs(this.y - aPoint.y);

        let c = Math.sqrt( a*a + b*b );
        return c;
    }

}