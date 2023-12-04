
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
    addCharge(anX, anY, aCharge)
    {
        this.charges.push(new Charge(this.ctx, anX, anY, aCharge));
    }

///////////////////////////////////////////////////////////////////////////////
    drawTraces(aCharge)
    {
        let degreesStep = 360 / View.numTraces;
        
        for(let degrees = 0; degrees < 360; degrees = degrees +degreesStep)
        {
            let theta = this.degreesToRadians(degrees);

            let currentTrace = new Trace(this.ctx);

            let focusedCharge = aCharge;

            let particle = new Particle(0, theta, focusedCharge.charge);
            particle.setCenter(focusedCharge.point);

            let point = particle.getPoint();

            currentTrace.addPoint(point);

            do
            {
                particle.move();

                point = particle.getPoint();

                let charge = this.getMostValuableCharge(point);

                if(!charge.point.isPointEqual(focusedCharge.point))
                {
                    focusedCharge = charge;

                    let deltaDegrees = this.angleDegrees(point, charge.point);
                
                    // deltaDegrees = this.anglesMinus(180, deltaDegrees);
                    particle.theta = this.degreesToRadians(deltaDegrees);
                    particle.setCenter(point);
    
                    if (!currentTrace.addPoint(point))
                    {
                        let deltaDegrees = this.angleDegrees(point, charge.point);
                        deltaDegrees = this.anglesAdd(deltaDegrees, 90);
                    
                        // deltaDegrees = this.anglesMinus(180, deltaDegrees);
                        particle.theta = this.degreesToRadians(deltaDegrees);                       
                    }
    
                    // if (deltaDegrees == 180 || deltaDegrees == 0)
                    // {
                    //     break;
                    // }
                        // deltaDegrees = degrees + deltaDegrees;
                        // polar.theta = this.degreesToRadians(deltaDegrees);
                        // polar.r = 0;
                        // polar.setCenter(point.x, point.y);
    
                    // if(charge2.isPointNear(point))
                    // {
                    //     break;
                    // }
                }
            }
            while(!this.isPointOutOfBounds(point));

            currentTrace.addPoint(point);
            currentTrace.finish();
            currentTrace.draw();

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

    // isSignEqual(aNumber1, aNumber2)
    // {
    //     let result = false;

    //     if(aNumber1 > 0 && aNumber2 > 0)

    //     return result;
    // }

    isPosEqual(aPoint1, aPoint2)
    {
        return aPoint1.x == aPoint2.x && 
            aPoint1.y == aPoint2.y;
    }

    angleRadians(anchorPoint, point)
    {
        return Math.atan2(anchorPoint.y - point.y, anchorPoint.x - point.x) * 180 / Math.PI + 180
    }

    angleDegrees(anchorPoint, point)
    {
        return Math.atan2(anchorPoint.y - point.y, anchorPoint.x - point.x) * 180 / Math.PI;
        // return Math.atan2(anchorPoint.y - point.y, anchorPoint.x - point.x) * 180 / Math.PI + 180
    }

    anglesAdd(aDegrees1, aDegrees2)
    {
        let result = aDegrees1 + aDegrees2;
        if (result > 360)
        {
            result = 360 - result;
        }
        return result;
    }

    anglesMinus(aDegrees1, aDegrees2)
    {
        let result = aDegrees1 - aDegrees2;
        if(result < 0)
        {
            result = 360 - result;
        }
        return result;
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

    getMostValuableCharge(point)
    {
        let arr = this.calculatePotentialsForPoint(point);
        let maxPotential = arr[0];
        let result = this.charges[0];

        for (let i=0; i<this.charges.length; i++)
        {
            if (arr[i] > maxPotential)
            {
                maxPotential = arr[i];
                result = this.charges[i];
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
            let d = point.distance(charge.point);
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
