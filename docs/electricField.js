class ElectricField
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    add(efield)
    {
        this.x += efield.x;
        this.y += efield.y;
    }

    minus(efield)
    {
        this.x -= efield.x;
        this.y -= efield.y;
    }
}
