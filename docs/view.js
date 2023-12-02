
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
        let degreesStep = 360 / View.numTraces;
        
        for(let degrees = 0; degrees < 360; degrees = degrees +degreesStep)
        {
            let theta = this.degreesToRadians(degrees);

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
                    this.ctx.stroke();
                    let ch = this.charges[index];
                    let deltaTheta = this.angleRadians(point, {x: ch.x, y: ch.y });

                    polar.theta = deltaTheta;
                    polar.r = 0;


                    // break;
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

    angleRadians(anchorPoint, point)
    {
        return Math.atan2(anchorPoint.y - point.y, anchorPoint.x - point.x) * 180 / Math.PI + 180
    }

// const angle = (anchor, point) => Math.atan2(anchor.y - point.y, anchor.x - point.x) * 180 / Math.PI + 180;

// const a = {
// 	x: 20,
// 	y: 20
// };

// const p = {
// 	x: 0,
// 	y: 0
// };

// angle(a, p); // 225

// // angle in degrees, from example, same data
// angleDeg = Math.atan2(a.y - p.y, a.x - p.x) * 180 / Math.PI; // 45

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

    degreesToRadians(degrees)
    {
        let pi = Math.PI;
        return degrees * (pi/180);
    }

}
