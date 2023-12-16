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

    // /////////////////////////////////////////////////////////////////////////////
    addCharge(x, y, q)
    {
        this.charges.push(new Charge(x, y, q));
    }

    enumerateAllChargesWithCallback(aCallback)
    {
        for (let i = 0; i < this.charges.length; i++)
        {
            const charge = this.charges[i];
            aCallback(charge);
        }
    }

    // /////////////////////////////////////////////////////////////////////////////

    draw()
    {
        this.ctx.strokeStyle = "#000";
        for (let i = 0; i < this.charges.length; i++)
        {
            const charge = this.charges[i];
            if (charge.q < 0)
            {
                continue;
            }

            for (let a = 0; a < 2 * Math.PI; a += Math.PI / 8)
            {
                const r = new Particle(a, charge.getPoint());

                this.ctx.beginPath();
                this.ctx.moveTo(r.point.x, r.point.y);

                do
                {
                    console.log("***********************");
                    const e = new ElectricField(0, 0);
                    let b = false;
                    for (let j = 0; j < this.charges.length; j++)
                    {
                        const charge2 = this.charges[j];
                        if (charge2.getPoint().distance(r.point) < 10)
                        {
                            b = true;
                            break;
                        }

                        const e1 = charge2.getElectricField(r.point.x, r.point.y);

                        console.log(charge2.name + ": " + e1.x + ", " + e1.y);

                        e.add(e1);
                    }

                    if (b)
                    {
                        break;
                    }

                    r.addEField(e);

                    if (r.point.x > 390)
                    {
                        console.log("11");
                    }

                    console.log("point: " + r.point.x + ", " + r.point.y);

                    this.ctx.lineTo(r.point.x, r.point.y);
                }
                while (!this.isPointOutOfBounds(r.point));

                this.ctx.stroke();
            }
        }
    }

    // /////////////////////////////////////////////////////////////////////////////

    isPointOutOfBounds(point)
    {
        return point.x < 0 ||
            point.x > this.maxWidth ||
            point.y < 0 ||
            point.y > this.maxHeight;
    }
}
