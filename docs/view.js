
class View
{
    static numTraces = 5;

    constructor(ctx, maxWidth, maxHeight)
    {
        this.ctx = ctx;
        this.charges = [];
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
    }

///////////////////////////////////////////////////////////////////////////////
    addCharge(anX, anY, anIntensity)
    {
        this.charges.push(new Charge(this.ctx, anX, anY, anIntensity));
    }

///////////////////////////////////////////////////////////////////////////////
    drawTraces(charge)
    {
        let thetaStep = 360 / View.numTraces;
        
        for(let theta = 0; theta < 360; theta = theta +thetaStep)
        {
            let r = 0;
            let polar = new Polar(r, theta);
            polar.setCenter(charge.x, charge.y);
            let point = polar.toCartesian();

            this.ctx.beginPath();
            this.ctx.moveTo(point.x, point.y);
            do
            {                
                polar.r++;
                point = polar.toCartesian(charge.x, charge.y);
                this.ctx.lineTo(point.x, point.y);``
            }
            while(!this.isPointOutOfBounds(point));
            this.ctx.stroke();
        }
    
    }

    draw()
    {
        for (let i=0; i<this.charges.length; i++)
        {
            let charge = this.charges[i];
            charge.draw();
            this.drawTraces(charge);
        }        
    }

///////////////////////////////////////////////////////////////////////////////
    isPointOutOfBounds(point)
    {
        return point.x < 0 || 
            point.x > this.maxWidth ||
            point.y < 0 ||
            point.y > this.maxHeight;
    }
}
