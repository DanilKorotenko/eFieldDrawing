
class Trace
{
    constructor(aCtx)
    {
        this.chunks = [];
        this.currentPath = null;
        this.ctx = aCtx;
    }

    addPoint(aPoint)
    {
        if (this.currentPath == null)
        {
            this.currentPath = new BezierPath(this.ctx);
        }

        if (this.currentPath.isPointExist(aPoint))
        {
            return false;
        }

        if (!this.currentPath.addPoint(aPoint))
        {
            this.chunks.push(this.currentPath);
            this.currentPath = new BezierPath(this.ctx);

            this.currentPath.addPoint(aPoint);
        }

        return true;
    }

    finish()
    {
        this.chunks.push(this.currentPath);
        this.currentPath = new BezierPath(this.ctx);
    }

    draw()
    {
        for (let i=0; i<this.chunks.length; i++)
        {
            this.chunks[i].draw();
        }
    }
}