
class Polar
{
    constructor(anR, aTheta)
    {
        this.r = anR;
        this.theta = aTheta;
        this.dx = 0;
        this.dy = 0;
    }

    setCenter(anX, anY)
    {
        this.dx = anX;
        this.dy = anY;
    }

    toCartesian()
    {
        let result = 
        { 
            x: this.dx + (this.r * Math.cos(this.theta)),
            y: this.dy + (this.r * Math.sin(this.theta))
        };

        return result;
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