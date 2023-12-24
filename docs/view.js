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

    getSelectedCharge()
    {
        let result = null;
        for (let i = 0; i < this.charges.length; i++)
        {
            const charge = this.charges[i];
            if (charge.isSelected)
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
        this.isDragging = true;
        this.clearSelection();

        const charge = this.getChargeOnPoint(point);
        if (charge)
        {
            charge.isSelected = true;
        }

        if (this.onChargeSelected)
        {
            this.onChargeSelected(charge);
        }

        this.draw();
    }

    mouseMove(point)
    {
        if (this.isDragging)
        {
            const charge = this.getSelectedCharge();
            if (charge)
            {
                charge.point = point;
                this.draw();
            }
        }
    }

    mouseUp(point)
    {
        this.isDragging = false;
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
                const particle = charge.createParticle(a);

                this.ctx.beginPath();
                this.ctx.moveTo(particle.point.x, particle.point.y);

                do
                {
                    const e = this.calculateTotalEfield(particle);

                    particle.addEField(e);

                    this.ctx.lineTo(particle.point.x, particle.point.y);
                }
                while (!this.isPointOutOfBounds(particle.point) &&
                    !this.isPointNearAnyCharge(particle.point));

                this.ctx.stroke();
            }
        }
    }

    // /////////////////////////////////////////////////////////////////////////////

    calculateTotalEfield(aParticle)
    {
        const result = new ElectricField(0, 0);
        for (let j = 0; j < this.charges.length; j++)
        {
            const charge2 = this.charges[j];
            const e = charge2.getElectricField(aParticle);
            result.add(e);
        }
        return result;
    }

    // /////////////////////////////////////////////////////////////////////////////

    isPointNearAnyCharge(point)
    {
        let result = false;
        for (let i = 0; i < this.charges.length; i++)
        {
            const charge = this.charges[i];
            if (charge.point.distance(point) < 10)
            {
                result = true;
                break;
            }
        }
        return result;
    }

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
