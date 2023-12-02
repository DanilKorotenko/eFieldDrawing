
class View
{
    constructor(ctx)
    {
        this.ctx = ctx;
        this.charges = [];
    }

    addCharge(anX, anY, anIntensity)
    {
        this.charges.push(new Charge(this.ctx, anX, anY, anIntensity));
    }

    draw()
    {
        for (let i=0; i<this.charges.length; i++)
        {
            let charge = this.charges[i];
            charge.draw();
        }        
    }
}
