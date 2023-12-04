
class Particle
{
    constructor(anR, aTheta, aCharge)
    {
        this.r = anR;
        this.theta = aTheta;
        this.center = new Point(0,0);
        this.charge = aCharge;
    }

    setCenter(aPoint)
    {
        this.center = aPoint;
        this.r = 0;
    }

    move()
    {
        this.r++;
    }

    getPoint()
    {
        let x = this.center.x + (this.r * Math.cos(this.theta));
        let y = this.center.y + (this.r * Math.sin(this.theta));
        let point = new Point(x, y); 

        return point;
    }

}

// Given an object in Cartesian coordinates { x: …, y: … }
// compute its Polar coordiantes { r: …, theta: … } 
function cartesian_to_polar({x, y}) 
{
    let result =     
        { 
            r: Math.sqrt(x * x + y * y), 
            theta: Math.atan2(y, x) 
        };
    return result;
}

// // Given an object in Polar coordiantes { r: …, theta: … } 
// // compute its Cartesian coordinates { x: …, y: … }
// function polar_to_cartesian({r, theta}) 
// {
//     let result = 
//         { 
//             x: r * Math.cos(theta),
//             y: r * Math.sin(theta)
//         };
//     return result;
// }