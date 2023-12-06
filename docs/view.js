
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
    addCharge(x, y, q)
    {
        this.charges.push(new Charge(x, y, q));
    }

///////////////////////////////////////////////////////////////////////////////

    draw()
    {
        this.ctx.strokeStyle = "#000";
        for (let i=0; i<this.charges.length; i++)
        {
            let charge = this.charges[i];
            if(charge.q < 0) 
            {
                continue;
            }

            for(let a = 0.; a<2.*Math.PI; a+=Math.PI/8.) 
            {
                let r = [charge.x + 10 * Math.cos(a), charge.y + 10 * Math.sin(a)];

                this.ctx.beginPath();
                this.ctx.moveTo(r[0], r[1]);
          
                for(var d=0; d<2000; d++) 
                {
                    let e = [0., 0.];
                    let b = false;
                    for(let j=0; j<this.charges.length; j++) 
                    {
                        if( (this.charges[j].x - r[0]) * (this.charges[j].x - r[0]) + (this.charges[j].y - r[1]) * (this.charges[j].y - r[1]) < 100 ) 
                        {
                            b = true;
                            break;
                        }
                    
                        let e1 = this.charges[j].getElectricField(r[0], r[1]);
                        e[0] += e1[0];
                        e[1] += e1[1];
                    }
                    if(b) 
                    {
                        break;
                    }
                    let r2 = [r[0] + 0.01*e[0], r[1] + 0.01*e[1]];
                    r[0] = r2[0];
                    r[1] = r2[1];
                    this.ctx.lineTo(r[0], r[1]);
                }
                this.ctx.stroke();
            }
        }
    }

///////////////////////////////////////////////////////////////////////////////

}
