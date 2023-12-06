class Point
{
    static nearRegion = 5;

    constructor(anX, anY)
    {
        this.x = Math.round(anX);
        this.y = Math.round(anY);
    }

    isPointNear(aPoint)
    {
        let xIsNear = (aPoint.x > (this.x - Point.nearRegion)) && (aPoint.x < (this.x + Point.nearRegion));
        let yIsNear = (aPoint.y > (this.y - Point.nearRegion)) && (aPoint.y < (this.y + Point.nearRegion));

        return xIsNear && yIsNear;
    }

    isFloatEqual(aFloat1, aFloat2)
    {
        return Math.abs(aFloat1 - aFloat2) < 1;
    }

    isPointEqual(aPoint)
    {
        return this.isFloatEqual(this.x, aPoint.x) && 
            this.isFloatEqual(this.y, aPoint.y);
    }

    distance(aPoint)
    {
        let a = Math.abs(this.x - aPoint.x);
        let b = Math.abs(this.y - aPoint.y);

        let c = Math.sqrt( a*a + b*b );
        return c;
    }

}