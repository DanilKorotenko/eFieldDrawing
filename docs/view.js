class View
{
    constructor(ctx, options)
    {
        this.ctx = ctx;
        this.charges = [];
        this.options = options;
    }

    // /////////////////////////////////////////////////////////////////////////////

    getChargeOnPoint(point)
    {
        let result = null;
        for (let i = 0; i < this.charges.length; i++)
        {
            const charge = this.charges[i];
            if (charge.point.distance(point) < this.options.chargeRadius)
            {
                result = charge;
                break;
            }
        }
        return result;
    }

    clearSelection()
    {
        for (let i = 0; i < this.charges.length; i++)
        {
            const charge = this.charges[i];
            charge.isSelected = false;
        }
    }

    mouseDown(point)
    {
        const charge = this.getChargeOnPoint(point);
        if (charge)
        {
            charge.isSelected = true;
        }
        else
        {
            this.clearSelection();
        }
        this.draw();
    }

    // /////////////////////////////////////////////////////////////////////////////

    clearCanvas()
    {
        this.ctx.clearRect(0, 0, this.options.maxWidth, this.options.maxHeight);
    }

    draw()
    {
        this.clearCanvas();
        this.ctx.strokeStyle = "#000";
        const degreesStep = 360 / this.options.numTraces;

        for (let i = 0; i < this.charges.length; i++)
        {
            const charge = this.charges[i];

            charge.draw(this.ctx, this.options);

            for (let degrees = 1; degrees < 360; degrees = degrees + degreesStep)
            {
                const a = this.degreesToRadians(degrees);
                const r = new Particle(a, charge.point);

                this.ctx.beginPath();
                this.ctx.moveTo(r.point.x, r.point.y);

                do
                {
                    const e = new ElectricField(0, 0);
                    let b = false;
                    for (let j = 0; j < this.charges.length; j++)
                    {
                        const charge2 = this.charges[j];
                        if (charge2.point.distance(r.point) < 10)
                        {
                            b = true;
                            break;
                        }

                        const e1 = charge2.getElectricField(r.point.x, r.point.y, charge.isPositive());
                        e.add(e1);
                    }

                    if (b)
                    {
                        break;
                    }

                    r.addEField(e);

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
            point.x > this.options.maxWidth ||
            point.y < 0 ||
            point.y > this.options.maxHeight;
    }

    degreesToRadians(degrees)
    {
        return degrees * (Math.PI / 180);
    }
}
