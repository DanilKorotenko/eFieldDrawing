class Point
{
    static nearRegion = 5;

    constructor(anX, anY)
    {
        this.x = anX;
        this.y = anY;
    }

    isPointNear(aPoint)
    {
        let xIsNear = (aPoint.x > (this.x - Point.nearRegion)) && (aPoint.x < (this.x + Point.nearRegion));
        let yIsNear = (aPoint.y > (this.y - Point.nearRegion)) && (aPoint.y < (this.y + Point.nearRegion));

        return xIsNear && yIsNear;
    }

    isPointEqual(aPoint)
    {
        return this.x == aPoint.x && this.y == aPoint.y;
    }

    distance(aPoint)
    {
        let a = Math.abs(this.x - aPoint.x);
        let b = Math.abs(this.y - aPoint.y);

        let c = Math.sqrt( a*a + b*b );
        return c;
    }

}