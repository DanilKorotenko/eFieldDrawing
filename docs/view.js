
class View
{
    static numTraces = 10;

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
        let index = this.charges.length;
        this.charges.push(new Charge(this.ctx, anX, anY, anIntensity, index));
    }

///////////////////////////////////////////////////////////////////////////////
    drawTraces(charge)
    {
        let thetaStep = 360 / View.numTraces;
        
        for(let theta = 0; theta < 360; theta = theta +thetaStep)
        {
            let polar = new Polar(0, theta);
            polar.setCenter(charge.x, charge.y);
            let point = polar.toCartesian();

            this.ctx.beginPath();
            this.ctx.moveTo(point.x, point.y);
            let points = [];

            do
            {                
                polar.r++;
                point = polar.toCartesian(charge.x, charge.y);

                let index = this.getIndexOfMaxPotential(point);
                if(index >= 0 && index != charge.index)
                {
                    this.ctx.lineTo(point.x, point.y);

                    break;
                }
            }
            while(!this.isPointOutOfBounds(point));
            this.ctx.lineTo(point.x, point.y);
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

    getIndexOfMaxPotential(point)
    {
        let arr = this.calculatePotentialsForPoint(point);
        let maxPotential = arr[0];
        let result = 0;
        for (let i=0; i<this.charges.length; i++)
        {
            if (arr[i] > maxPotential)
            {
                maxPotential = arr[i];
                result = i;
                break;
            }
        }
        return result
    }

    calculatePotentialsForPoint(point)
    {
        let potentials = [];

        for (let i=0; i<this.charges.length; i++)
        {
            let charge = this.charges[i];
            let d = this.distance(point, charge);
            potentials.push(d);
        }        

        potentials = this.normalize(potentials);
        potentials = this.invertNormalisation(potentials);

        return potentials;
    }    

    findMax(arr)
    {
        let result = arr[0];

        for (let i = 0; i < arr.length; i++)
        {
            if(arr[i] > result)
            {
                result = arr[i];
            }
        }

        return result;
    }

    normalize(arr)
    {
        let max = this.findMax(arr);
        let result = arr;
        for (let i = 0; i < arr.length; i++)
        {
            result[i] = result[i] / max;
        }
        return result;
    }

    invertNormalisation(arr)
    {
        let result = arr;
        for (let i = 0; i < arr.length; i++)
        {
            result[i] = 1 - result[i];
        }
        return result;
    }

    distance(point1, point2)
    {
        let a = Math.abs(point1.x - point2.x);
        let b = Math.abs(point1.y - point2.y);

        let c = Math.sqrt( a*a + b*b );
        return c;
    }

    isPointOutOfBounds(point)
    {
        return point.x < 0 || 
            point.x > this.maxWidth ||
            point.y < 0 ||
            point.y > this.maxHeight;
    }
}
