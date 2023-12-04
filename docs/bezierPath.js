class BezierPath
{
    constructor(aCtx)
    {
        this.ctx = aCtx;
        this.startPoint = null;
        this.controlPoint1 = null;
        this.controlPoint2 = null;
        this.endPoint = null;
        this.points = [];
    }

    isPointExist(aPoint)
    {
        for(let i=0; i<this.points.length; i++)
        {
            let point = this.points[i];
            if (aPoint.isPointEqual(point))
            {
                return true;
            }
        }
        return false;
    }

    addPoint(aPoint)
    {
        if(this.startPoint == null)
        {
            this.startPoint = aPoint;
            this.points.push(aPoint);
            return true;
        }
        else if (!this.startPoint.isPointEqual(aPoint) && this.controlPoint1 == null)
        {
            this.controlPoint1 = aPoint;
            this.points.push(aPoint);
            return true;
        }
        else if (!this.controlPoint1.isPointEqual(aPoint) && this.controlPoint2 == null)
        {
            this.controlPoint2 = aPoint;
            this.points.push(aPoint);
            return true;
        }
        else if (!this.controlPoint2.isPointEqual(aPoint) && this.endPoint == null)
        {
            this.endPoint = aPoint;
            this.points.push(aPoint);
            return true;
        }

        return false;
    }

    draw()
    {
        if (this.startPoint == null)
        {
            return;
        }

        if(this.controlPoint1==null && this.controlPoint2==null && this.endPoint==null)
        {
            return;
        }

        this.ctx.beginPath();
        this.ctx.moveTo(this.startPoint.x, this.startPoint.y);

        if(this.controlPoint1!=null && this.controlPoint2!=null && this.endPoint!=null)
        {
            this.ctx.bezierCurveTo(this.controlPoint1.x, this.controlPoint1.y, this.controlPoint2.x, this.controlPoint2.y, this.endPoint.x, this.endPoint.y);
        }
        else if (this.controlPoint1!=null && this.controlPoint2!=null)
        {
            this.endPoint = this.controlPoint2;
            this.ctx.bezierCurveTo(this.controlPoint1.x, this.controlPoint1.y, this.controlPoint1.x, this.controlPoint1.y, this.endPoint.x, this.endPoint.y);
        }
        else if (this.controlPoint1!=null)
        {
            this.endPoint = this.controlPoint1;
            this.ctx.bezierCurveTo(this.controlPoint1.x, this.controlPoint1.y, this.controlPoint1.x, this.controlPoint1.y, this.endPoint.x, this.endPoint.y);
        }
  
        this.ctx.stroke();
    }
}