class View
{
    constructor(ctx, options)
    {
        this.ctx = ctx;
        this.charges = [];
        this.options = options;
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

            this.ctx.beginPath();
            this.ctx.arc(charge.getPoint().x, charge.getPoint().y, this.options.chargeRadius, 0, 2 * Math.PI);
            this.ctx.fill();

            for (let degrees = 1; degrees < 360; degrees = degrees + degreesStep)
            {
                const a = this.degreesToRadians(degrees);
                const r = new Particle(a, charge.getPoint());

                this.ctx.beginPath();
                this.ctx.moveTo(r.point.x, r.point.y);

                do
                {
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
